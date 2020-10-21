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

function AppWithReducers() {
    let todoListID1 = v1()
    let todoListID2 = v1()

    let [todoLists, dispatchTodoLists] = useReducer(todolistReducer, [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: false},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Java", isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: "Books", isDone: false},
            {id: v1(), title: "Butter", isDone: false},
            {id: v1(), title: "Onion", isDone: false},
            {id: v1(), title: "Garlik", isDone: false}
        ],
    })

    const addTask = (title: string, todoListID: string) => {
        dispatchTasks(addTaskAC(title, todoListID))
    }
    const removeTask = (taskId: string, todoListID: string) => {
        dispatchTasks(removeTaskAC(taskId, todoListID))
    }

    const changeStatus = (taskId: string, isDone: boolean, todoListID: string) => {
       dispatchTasks(changeTaskStatusAC(taskId, isDone, todoListID))
    }
    const changeFilter = ( id: string, filter: FilterValuesType) => {
        dispatchTodoLists(changeTodolistFilterAC(id, filter))
    }

    const removeTodoList = (todoListID: string) => {
        let action = removeTodolistAC(todoListID)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
    const addTodoList = (title: string) => {
        let action = addTodolistAC(title)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    const changeTaskTitle = (taskId: string, title: string, todoListID: string) => {
        dispatchTasks(changeTaskTitleAC(taskId, title, todoListID))
    }
    const changeTodoListTitle = (todoListID: string, title: string) => {
        dispatchTodoLists(changeTodolistTitleAC(todoListID, title))
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

export default AppWithReducers;
