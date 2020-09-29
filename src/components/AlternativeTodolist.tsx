import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TaskType} from "./AlternativeApp";
import {FilterValuesType} from "./AlternativeApp";

type AlternativeTodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export function AlternativeTodolist(props: AlternativeTodolistPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const addNewTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim(), props.id)
            setNewTaskTitle("")
        } else {
            setError("Title is required!!!")
        }
    }
    const onNewTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value)
    const onKeyBoardNewTaskTitleChange = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.ctrlKey && e.charCode === 13) {
            addNewTask()
        }
    }
    const onAllHandlerClick = () => props.changeFilter("All", props.id)
    const onActiveHandlerClick = () => props.changeFilter("Active", props.id)
    const onCompletedHandlerClick = () => props.changeFilter("Completed", props.id)

    const removeTodoList = () => props.removeTodoList(props.id)

    return (
        <div>
            <div>
                <h3>{props.title}<button className={"deleteButton"} onClick={removeTodoList}>x</button></h3>
                <div>
                    <input value={newTaskTitle}
                           onChange={onNewTaskTitleChange}
                           onKeyPress={onKeyBoardNewTaskTitleChange}
                           className={error ? "error" : ""}
                    />
                    <button onClick={addNewTask} className={"addButton"}>+</button>
                    {error && <div className="error_message">{error}</div>}
                </div>
                <ul>
                    {
                        props.tasks.map(t => {
                                const removeToDoListTask = () => props.removeTask(t.id, props.id)
                                const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeStatus(t.id, e.currentTarget.checked, props.id)
                                }
                                return (
                                    <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                        <input
                                            type="checkbox"
                                            onChange={onStatusChange}
                                            checked={t.isDone}/>
                                        <span>{t.title}</span>
                                        <button onClick={removeToDoListTask} className={"deleteButton"}>x</button>
                                    </li>
                                )
                            }
                        )
                    }
                </ul>

                <div>
                    <button
                        onClick={onAllHandlerClick}
                        className={props.filter === "All" ? "active-filter" : ""}
                    >All
                    </button>
                    <button
                        onClick={onActiveHandlerClick}
                        className={props.filter === "Active" ? "active-filter" : ""}
                    >Active
                    </button>
                    <button
                        onClick={onCompletedHandlerClick}
                        className={props.filter === "Completed" ? "active-filter" : ""}
                    >Completed
                    </button>
                </div>
            </div>
        </div>
    )
}