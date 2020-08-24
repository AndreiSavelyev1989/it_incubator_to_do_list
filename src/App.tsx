import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setState] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "React", isDone: true},
        {id: 4, title: "Java", isDone: true}
    ])

    const removeTask = (taskId: number) => {
        tasks = tasks.filter(t => t.id !== taskId)
        setState(tasks);
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
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
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
