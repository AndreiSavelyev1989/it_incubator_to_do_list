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

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: false},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Java", isDone: false}
    ])

    const removeTask = (taskId: string) => {
        tasks = tasks.filter(t => t.id !== taskId)
        setTasks(tasks);
    }

    const addTask = (title: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks([...tasks])
        }
    }

    let tasksForToDoList = tasks;
    let [filter, setFilter] = useState<FilterValuesType>("all")
    if (filter === "active") {
        tasksForToDoList = tasks.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForToDoList = tasks.filter(t => t.isDone)
    }


    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={tasksForToDoList}
                addTask={addTask}
                removeTask={removeTask}
                changeFilter={changeFilter}
                changeStatus={changeStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
