import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/api";

type PropsType = {
    todolistId: string
    task: TaskType
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

export const Task = React.memo((props: PropsType) => {
    console.log('render Task')
    const removeTask = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.removeTask, props.task.id, props.todolistId])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.changeTaskStatus, props.task.id, props.todolistId])

    const changeItemValue = useCallback((value: string) => {
        props.changeTaskTitle(props.task.id, value, props.todolistId)
    }, [props.changeTaskTitle, props.task.id, props.todolistId])

    return (
        <li className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
        >
            <Checkbox
                color={"secondary"}
                checked={props.task.status === TaskStatuses.Completed}
                onChange={changeStatus}
            />

            <EditableSpan value={props.task.title} changeValue={changeItemValue}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>
    )
})
