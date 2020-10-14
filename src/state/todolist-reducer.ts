import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export const REMOVE_TODOLIST = "REMOVE_TODOLIST"
export const ADD_TODOLIST = "ADD_TODOLIST"
export const CHANGE_TODOLIST_TITLE = "CHANGE_TODOLIST_TITLE"
export const CHANGE_TODOLIST_FILTER = "CHANGE_TODOLIST_FILTER"

export type ActionsTodoListTypes =
    ReturnType<typeof removeTodolistAC> |
    ReturnType<typeof addTodolistAC> |
    ReturnType<typeof changeTodolistTitleAC> |
    ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (id: string) => ({type: REMOVE_TODOLIST, id}) as const
export const addTodolistAC = (title: string ) => ({type: ADD_TODOLIST, title, todolistId: v1()}) as const
export const changeTodolistTitleAC = (id: string, title: string) => ({type: CHANGE_TODOLIST_TITLE, id, title}) as const
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: CHANGE_TODOLIST_FILTER, id, filter}) as const

export const todolistReducer = (state: Array<TodoListType>, action: ActionsTodoListTypes) => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.id)

        case ADD_TODOLIST:
            const newTodoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodoList]

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
        default:
            throw new Error("I don't understand this type")
    }
}