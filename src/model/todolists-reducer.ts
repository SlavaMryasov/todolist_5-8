import { FilterValuesType, TodolistType } from '../App'
import { v1 } from "uuid"

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    { id: todolistID1, title: 'what to learn', filter: 'all' },
    { id: todolistID2, title: 'what to buy', filter: 'all' },
]

export const totolistReducer = (state = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistType = { id: action.payload.todolistId, title: action.payload.title, filter: 'all' }
            return [newTodolist, ...state]
        }
        case 'UPDATE-TODOLIST': {
            return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl)
        }
        case 'CHANGE-FILTER': {
            return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filter } : tl)
        }
        default: throw new Error('I dont understand this type')
    }
}

type ActionType = RemoveTodolistType | AddTodolistType | UpdateTodolistType | ChangeFilterType


type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST',
    payload: {
        id: string
    }
}

export type AddTodolistType = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
        todolistId: string
    }
}

type UpdateTodolistType = {
    type: 'UPDATE-TODOLIST'
    payload: {
        todolistId: string
        title: string
    }
}

type ChangeFilterType = {
    type: "CHANGE-FILTER"
    payload: {
        filter: FilterValuesType
        todolistId: string
    }
}

export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}

export const addTodolistAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title,
            todolistId,
        }
    } as const
}

export const updateTodolistAC = (todolistId: string, title: string) => {
    return {
        type: 'UPDATE-TODOLIST',
        payload: {
            todolistId,
            title,
        }
    } as const
}

export const changeFilterAC = (filter: FilterValuesType, todolistId: string) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            filter,
            todolistId
        }
    } as const
}
