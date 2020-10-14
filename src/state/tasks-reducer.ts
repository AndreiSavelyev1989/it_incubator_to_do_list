import {TasksStateType, TaskType, TodoListType} from "../App";
import {v1} from "uuid";
import {ADD_TODOLIST, addTodolistAC, REMOVE_TODOLIST, removeTodolistAC} from "./todolist-reducer";

const REMOVE_TASK = "REMOVE_TASK"
const ADD_TASK = "ADD_TASK"
const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS"
const CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE"

export type ActionsTasksType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof changeTaskStatusAC> |
    ReturnType<typeof changeTaskTitleAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof removeTodolistAC>

export const removeTaskAC = (taskId: string, todoListId: string) => ({type: REMOVE_TASK, taskId, todoListId}) as const
export const addTaskAC = (title: string, todoListId: string) => ({type: ADD_TASK, title, todoListId}) as const
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => ({
    type: CHANGE_TASK_STATUS,
    taskId,
    isDone,
    todoListId
}) as const
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => ({
    type: CHANGE_TASK_TITLE,
    taskId,
    title,
    todoListId
}) as const

export const tasksReducer = (state: TasksStateType, action: ActionsTasksType) => {
    switch (action.type) {
        case REMOVE_TASK:
            // let copyState = {...state}
            // copyState[action.todolistId] = copyState[action.todolistId].filter(t => t.id !== action.taskId)
            // return copyState
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case ADD_TASK:
            let newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {
                ...state,
                [action.todoListId]: [newTask, ...state[action.todoListId]]
            }
        case CHANGE_TASK_STATUS:
            const todoListTasks = state[action.todoListId]
            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.isDone = action.isDone
            }
            return {...state, [action.todoListId]: todoListTasks}

        case CHANGE_TASK_TITLE: {
            const todoListTasks = state[action.todoListId]
            const task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return {...state, [action.todoListId]: todoListTasks}
        }
        case ADD_TODOLIST: {
            return {...state, [action.todolistId]: []}
        }
        case REMOVE_TODOLIST:
            const copyState = {...state}
            delete copyState[action.id]
            return copyState

        default:
            throw new Error("I don't understand this type")
    }
}