import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {Task} from "./Task";

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

export const TodoList = React.memo((props: PropsType) => {
    console.log('render Todolist')
    let tasksForToDoList = props.tasks
    if (props.filter === "active") {
        tasksForToDoList = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForToDoList = props.tasks.filter(t => t.isDone)
    }

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, "all"), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, "active"), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, "completed"), [props.changeFilter, props.id])

    const removeTodoList = useCallback(() => props.removeTodoList(props.id), [props.removeTodoList, props.id])
    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title)
    }, [props.changeTodoListTitle, props.id])

    return (
        <div>
            <h3><EditableSpan value={props.title} changeValue={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton></h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: "0"}
            }>
                {tasksForToDoList.map(t => <Task
                    key={t.id}
                    taskId={t.id}
                    todolistId={props.id}
                    removeTask={props.removeTask}
                    changeStatus={props.changeStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    isDone={t.isDone}
                    title={t.title}
                />)}
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
})


