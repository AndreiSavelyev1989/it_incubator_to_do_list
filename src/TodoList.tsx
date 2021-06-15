import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {Task} from "./Task";
import {useDispatch} from "react-redux";
import {requestTasks} from "./state/tasks-reducer";
import {FilterValuesType} from "./state/todolist-reducer";
import {TaskStatuses, TaskType} from "./api/api";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
}

export const TodoList = React.memo((props: PropsType) => {
    console.log('render Todolist')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(requestTasks(props.id))
    }, [])

    let tasksForToDoList = props.tasks
    if (props.filter === "active") {
        tasksForToDoList = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForToDoList = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id])

    const removeTodoList = useCallback(() => props.removeTodolist(props.id), [props.removeTodolist, props.id])
    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id])

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
                    task={t}
                    todolistId={props.id}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
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


