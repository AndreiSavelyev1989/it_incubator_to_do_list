import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Java", isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: "Books", isDone: false},
            {id: v1(), title: "Butter", isDone: false},
            {id: v1(), title: "Onion", isDone: false},
            {id: v1(), title: "Garlik", isDone: false}
        ],
    })

    const addTask = (title: string, todoListID: string) => {
        let todoListTasks = tasks[todoListID]
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    const removeTask = (taskId: string, todoListID: string) => {
        let todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskId)
        setTasks({...tasks})
    }

    const changeStatus = (taskId: string, isDone: boolean, todoListID: string) => {
        let todoListTasks = tasks[todoListID]
        let task = todoListTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const changeFilter = (value: FilterValuesType, todoListID: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    const removeTodoList = (todoListID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todoLists.map(tl => {
                let tasksForToDoList = tasks[tl.id]
                if (tl.filter === "active") {
                    tasksForToDoList = tasks[tl.id].filter(t => !t.isDone)
                }
                if (tl.filter === "completed") {
                    tasksForToDoList = tasks[tl.id].filter(t => t.isDone)
                }
                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForToDoList}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                        removeTodoList={removeTodoList}
                    />
                )
            })}
        </div>
    );
}

export default App;
