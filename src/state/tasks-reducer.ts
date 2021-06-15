import {TasksStateType} from "../App";
import {
    ADD_TODOLIST,
    addTodolistAC,
    REMOVE_TODOLIST,
    removeTodolistAC,
    SET_TODOLISTS,
    setTodolistsAC
} from "./todolist-reducer";
import {tasksAPI, TaskStatuses, TaskType} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {AppRootStateType} from "./store";

const REMOVE_TASK = "REMOVE_TASK"
const ADD_TASK = "ADD_TASK"
const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS"
const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE"
const SET_TASKS = "SET_TASKS"

export type ActionsTasksType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasks>

export const removeTaskAC = (taskId: string, todoListId: string) => ({type: REMOVE_TASK, taskId, todoListId}) as const
export const addTaskAC = (task: TaskType) => ({type: ADD_TASK, task}) as const
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string) => ({
    type: CHANGE_TASK_STATUS,
    taskId,
    status,
    todoListId
}) as const
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => ({
    type: CHANGE_TASK_TITLE,
    taskId,
    title,
    todoListId
}) as const

export const setTasks = (todolistId: string, tasks: Array<TaskType>) => ({
    type: SET_TASKS,
    todolistId,
    tasks
} as const)

let initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsTasksType) => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case ADD_TASK: {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        }
        case CHANGE_TASK_STATUS:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId
                        ? {...t, status: action.status}
                        : t)
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId
                        ? {...t, title: action.title}
                        : t)
            }
        case ADD_TODOLIST:
            return {...state, [action.todolistId]: []}
        case REMOVE_TODOLIST:
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case SET_TODOLISTS: {
            const stateCopy = {...state}
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case SET_TASKS:
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        default:
            return state
    }
}

export type ThunkAuthType = ThunkAction<void, AppRootStateType, unknown, ActionsTasksType>

export const requestTasks = (todolistId: string): ThunkAuthType => (dispatch) => {
    return tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasks(todolistId, res.data.items))
        })
}

export const addTaskTC = (todolistId: string, title: string): ThunkAuthType => {
    return (dispatch) => {
        tasksAPI.createTask(todolistId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

// export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string): ThunkAuthType => {
//     return (dispatch) => {
//         tasksAPI.updateTask(todolistId, taskId, title)
//             .then((res) => {
//                 dispatch(changeTaskTitleAC(taskId, title, todolistId))
//             })
//     }
// }