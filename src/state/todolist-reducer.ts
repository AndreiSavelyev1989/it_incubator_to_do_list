import {v1} from "uuid";
import {AppRootStateType} from "./store";
import {ThunkAction} from "redux-thunk";
import {todolistAPI, TodoType} from "../api/api";

export const REMOVE_TODOLIST = "REMOVE_TODOLIST"
export const ADD_TODOLIST = "ADD_TODOLIST"
export const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE"
export const CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER"
export const SET_TODOLISTS = "SET_TODOLISTS"

export type ActionsTodoListTypes =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>

export const removeTodolistAC = (id: string) => ({type: REMOVE_TODOLIST, id} as const)
export const addTodolistAC = (title: string) => ({type: ADD_TODOLIST, title, todolistId: v1()} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({type: CHANGE_TODOLIST_TITLE, id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: CHANGE_TODOLIST_FILTER,
    id,
    filter
} as const)
export const setTodolistsAC = (todos: Array<TodoType>) => ({type: SET_TODOLISTS, todos} as const)

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodoType & {
    filter: FilterValuesType
}

let initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state = initialState, action: ActionsTodoListTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.id)

        case ADD_TODOLIST:
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]

        case CHANGE_TODOLIST_TITLE:
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                }
                return tl
            })

        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                }
                return tl
            })
        case SET_TODOLISTS:
            return action.todos.map(tl => ({
                ...tl,
                filter: 'all'
            }))
        default:
            return state
    }
}

export type ThunkAuthType = ThunkAction<void, AppRootStateType, unknown, ActionsTodoListTypes>

export const requestTodos = (): ThunkAuthType => (dispatch) => {
    return todolistAPI.getTodos()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const createTodo = (title: string): ThunkAuthType => (dispatch) => {
    return todolistAPI.createTodo(title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(title))
            }
        })
}

export const deleteTodo = (todolistId: string): ThunkAuthType => (dispatch) => {
    return todolistAPI.deleteTodo(todolistId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
            }
        })
}

export const updateTodoTitle = (todolistId: string, title: string): ThunkAuthType => (dispatch) => {
    return todolistAPI.updateTodo(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title))
            }
        })
}