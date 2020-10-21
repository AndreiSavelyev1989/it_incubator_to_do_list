import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AlternativeApp} from "./components/AlternativeApp";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

const addTask = (title: string, todoListID: string) => {
    dispatch(addTaskAC(title, todoListID))
}
const removeTask = (taskId: string, todoListID: string) => {
    dispatch(removeTaskAC(taskId, todoListID))
}

const changeStatus = (taskId: string, isDone: boolean, todoListID: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todoListID))
}
const changeFilter = (id: string, filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC(id, filter))
}

const removeTodoList = (todoListID: string) => {
    let action = removeTodolistAC(todoListID)
    dispatch(action)
}
const addTodoList = (title: string) => {
    let action = addTodolistAC(title)
    dispatch(action)
}

const changeTaskTitle = (taskId: string, title: string, todoListID: string) => {
    dispatch(changeTaskTitleAC(taskId, title, todoListID))
}
const changeTodoListTitle = (todoListID: string, title: string) => {
    dispatch(changeTodolistTitleAC(todoListID, title))
}

return (
    <div className="App">
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
        {/*<AlternativeApp />*/}
        <Container fixed>
            <Grid style={{padding: "15px"}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={5}>
                {todoLists.map(tl => {
                    let tasksForToDoList = tasks[tl.id]
                    if (tl.filter === "active") {
                        tasksForToDoList = tasks[tl.id].filter(t => !t.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForToDoList = tasks[tl.id].filter(t => t.isDone)
                    }
                    return (
                        <Grid key={tl.id} item>
                            <Paper style={{padding: "15px"}} elevation={5}>
                                <TodoList
                                    id={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    tasks={tasksForToDoList}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeStatus={changeStatus}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    </div>
);
}

export default AppWithRedux;