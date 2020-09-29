import React, {useState} from "react";
import {AlternativeTodolist} from "./AlternativeTodolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "All" | "Active" | "Completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function AlternativeApp() {

    const todoListId1 = v1()
    const todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "My animals", filter: "All"},
        {id: todoListId2, title: "What to buy", filter: "All"},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "Cat", isDone: true},
            {id: v1(), title: "Dog", isDone: true},
            {id: v1(), title: "Fish", isDone: false}
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Salt", isDone: true},
            {id: v1(), title: "Sugar", isDone: false},
            {id: v1(), title: "Bread", isDone: false}
        ],
    })

    const removeTodoList = (todoListId: string) => {
        todoLists = todoLists.filter(t => t.id !== todoListId)
        setTodoLists([...todoLists])
        delete tasks[todoListId]
        setTasks({...tasks})
    }

    const addTask = (title: string, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    const removeTask = (taskID: string, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    const changeStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const changeFilter = (value: FilterValuesType, todoListId: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }

    }

    return (
        <div className="App">
            {todoLists.map(tl => {
                let tasksForToDoList = tasks[tl.id]
                if (tl.filter === "Active") {
                    tasksForToDoList = tasksForToDoList.filter(t => !t.isDone)
                }
                if (tl.filter === "Completed") {
                    tasksForToDoList = tasksForToDoList.filter(t => t.isDone)
                }
                return (
                    <AlternativeTodolist
                        id={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksForToDoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    )
}