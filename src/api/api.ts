import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '2d811067-9a69-4553-9e1d-72dd0da27699'
    }
})

export type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodoType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodo(todolistId: string, title: string){
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    }
}