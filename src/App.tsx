import './App.css';
import { Todolist } from "./Todolist";
import React, { useReducer, useState } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { MenuButton } from "./MenuButton";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from "@mui/material/CssBaseline";
import { changeFilterAC, totolistReducer, updateTodolistAC } from './model/todolists-reducer';
import { removeTodolistAC } from './model/todolists-reducer';
import { addTodolistAC } from './model/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, initializeTasksAC, removeTaskAC, tasksReducer, updateTaskAC } from './model/tasks-reducer';

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

function App() {

	let todolistID1 = v1()
	let todolistID2 = v1()

	let [todolists, dispatchTodolists] = useReducer(totolistReducer, [
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	let [tasks, dispatchTasks] = useReducer(tasksReducer, {
		[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
		],
		[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
		],
	})

	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	const theme = createTheme({
		palette: {
			mode: themeMode === 'light' ? 'light' : 'dark',
			primary: {
				main: '#087EA4',
			},
		},
	});

	const removeTask = (taskId: string, todolistId: string) => {
		dispatchTasks(removeTaskAC(taskId, todolistId))
	}

	const addTask = (title: string, todolistId: string) => {

		const newTask = { id: v1(), title: title, isDone: false }
		dispatchTasks(addTaskAC(title, todolistId, newTask))
	}

	const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
		dispatchTasks(changeTaskStatusAC(taskId, taskStatus, todolistId))
	}


	const updateTask = (todolistId: string, taskId: string, title: string) => {
		dispatchTasks(updateTaskAC(todolistId, taskId, title))
	}

	const changeFilter = (filter: FilterValuesType, todolistId: string) => {
		dispatchTodolists(changeFilterAC(filter, todolistId))
	}

	const removeTodolist = (todolistId: string) => {
		dispatchTodolists(removeTodolistAC(todolistId))
	}


	const addTodolist = (title: string) => {
		const todolistId = v1()
		dispatchTasks(initializeTasksAC(todolistId))
		dispatchTodolists(addTodolistAC(title, todolistId))
	}



	const updateTodolist = (todolistId: string, title: string) => {
		dispatchTodolists(updateTodolistAC(todolistId, title))
	}

	const changeModeHandler = () => {
		setThemeMode(themeMode == "light" ? "dark" : 'light')
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar position="static" sx={{ mb: '30px' }}>
				<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<IconButton color="inherit">
						<MenuIcon />
					</IconButton>
					<div>
						<MenuButton>Login</MenuButton>
						<MenuButton>Logout</MenuButton>
						<MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
						<Switch color={'default'} onChange={changeModeHandler} />
					</div>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container sx={{ mb: '30px' }}>
					<AddItemForm
						addItem={addTodolist}
					/>
				</Grid>

				<Grid container spacing={4}>
					{todolists.map((tl) => {

						const allTodolistTasks = tasks[tl.id]
						let tasksForTodolist = allTodolistTasks

						if (tl.filter === 'active') {
							tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
						}

						if (tl.filter === 'completed') {
							tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
						}

						return (
							<Grid>
								<Paper sx={{ p: '0 20px 20px 20px' }}>
									<Todolist
										key={tl.id}
										todolistId={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}

										addTask={addTask}

										changeTaskStatus={changeTaskStatus}

										filter={tl.filter}
										removeTodolist={removeTodolist}

										updateTask={updateTask}

										updateTodolist={updateTodolist}

									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</ThemeProvider>
	);
}

export default App;
