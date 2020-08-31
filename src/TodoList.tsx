import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
}

export function TodoList(props: PropsType) {
    let [title, setTitle] = useState<string>("")
    console.log(title)

    const addTask = () => {
        props.addTask(title);
        setTitle("");
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyUp={onKeyUpHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(t => {

                    const removeTask = () => props.removeTask(t.id)

                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeTask}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>

    );
}

