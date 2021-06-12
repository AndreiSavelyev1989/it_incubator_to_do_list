import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
    todolistId: string
    taskId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
    isDone: boolean
    title: string
}

export const Task = React.memo((props: PropsType) => {
    console.log('render Task')
    const removeTask = useCallback(() => props.removeTask(props.taskId, props.todolistId), [props.removeTask, props.taskId, props.todolistId])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.taskId, e.currentTarget.checked, props.todolistId)
    }, [props.changeStatus, props.taskId, props.todolistId])

    const changeItemValue = useCallback((value: string) => {
        props.changeTaskTitle(props.taskId, value, props.todolistId)
    }, [props.changeTaskTitle, props.taskId, props.todolistId])

    return (
        <li className={props.isDone ? "is-done" : ""}
        >
            <Checkbox
                color={"secondary"}
                checked={props.isDone}
                onChange={changeStatus}
            />

            <EditableSpan value={props.title} changeValue={changeItemValue}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})
