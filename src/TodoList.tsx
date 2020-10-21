import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (id: string, filter: FilterValuesType) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
}

export function TodoList(props: PropsType) {

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(t.id, e.currentTarget.checked, props.id)
        }
        const changeItemValue = (value: string) => {
            props.changeTaskTitle(t.id, value, props.id)
        }
        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}
            >
                <Checkbox
                    color={"secondary"}
                    checked={t.isDone}
                    onChange={changeStatus}
                />

                <EditableSpan value={t.title} changeValue={changeItemValue}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    const onAllClickHandler = () => props.changeFilter(props.id, "all")
    const onActiveClickHandler = () => props.changeFilter(props.id, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")

    const removeTodoList = () => props.removeTodoList(props.id)
    const addTask = (title: string) => props.addTask(title, props.id)
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }
    return (
        <div>
            <h3><EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton></h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: "0"}
            }>
                {tasks}
            </ul>
            <div>
                <Button
                    variant={props.filter === "all" ? "contained" : "text"}
                    size={"small"}
                    onClick={onAllClickHandler}
                >All
                </Button>
                <Button
                    variant={props.filter === "active" ? "contained" : "text"}
                    size={"small"}
                    color={"primary"}
                    onClick={onActiveClickHandler}
                    style={{marginLeft: "15px"}}
                >Active
                </Button>
                <Button
                    variant={props.filter === "completed" ? "contained" : "text"}
                    size={"small"}
                    color={"secondary"}
                    onClick={onCompletedClickHandler}
                    style={{marginLeft: "15px"}}
                >Completed
                </Button>
            </div>
        </div>
    )
}


