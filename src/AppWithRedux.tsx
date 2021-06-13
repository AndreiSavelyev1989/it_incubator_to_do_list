import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {changeTodolistFilterAC, createTodo, deleteTodo, requestTodos, updateTodoTitle} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
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
    console.log('render App')
    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(requestTodos())
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])
    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskAC(taskId, todolistId))
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistId))
    }, [dispatch])
    const changeFilter = useCallback((id: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id, filter))
    }, [dispatch])

    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(deleteTodo(todolistId))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(createTodo(title))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, title: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId))
    }, [dispatch])
    const changeTodoListTitle = useCallback((todolistId: string, title: string) => {
        dispatch(updateTodoTitle(todolistId, title))
    }, [dispatch])

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
            <Container fixed>
                <Grid style={{padding: "15px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoLists.map(tl => {
                        const tasksForToDoList = tasks[tl.id]
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
