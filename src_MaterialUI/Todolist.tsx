import { FilterValuesType, TaskType } from "./App";
import { ChangeEvent } from "react";
// import { Button } from "./Button";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import { filterButtonContainerSX, getListItemSX } from "./Todolist.styles";

type PropsType = {
  title: string;
  todolistId: string;
  tasks: TaskType[];
  removeTask: (taskId: string, todolistId: string) => void;
  changeFilter: (filter: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    taskStatus: boolean,
    todolistId: string
  ) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  updateTask: (todolistId: string, taskId: string, title: string) => void;
  updateTodolist: (todolistId: string, title: string) => void;
};

export const Todolist = (props: PropsType) => {
  const {
    title,
    tasks,
    filter,
    removeTask,
    changeFilter,
    addTask,
    changeTaskStatus,
    todolistId,
    removeTodolist,
    updateTask,
    updateTodolist,
  } = props;

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(filter, props.todolistId);
  };

  const removeTodolistHandler = () => {
    removeTodolist(todolistId);
  };

  const addTaskCallback = (title: string) => {
    addTask(title, props.todolistId);
  };

  const updateTodolistHandler = (title: string) => {
    updateTodolist(props.todolistId, title);
  };

  return (
    <div>
      <div className={"todolist-title-container"}>
        <h3>
          <EditableSpan value={title} onChange={updateTodolistHandler} />
        </h3>
        {/* <Button title={'x'} onClick={removeTodolistHandler}/> */}
        <IconButton aria-label="delete" onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </div>
      <AddItemForm addItem={addTaskCallback} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map((task) => {
            const removeTaskHandler = () => {
              removeTask(task.id, todolistId);
            };

            const changeTaskStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              const newStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, newStatusValue, todolistId);
            };

            const changeTaskTitleHandler = (title: string) => {
              updateTask(todolistId, task.id, title);
            };

            return (
              <ListItem
                key={task.id}
                sx={getListItemSX(task.isDone)}
              >
                <div>
                  <Checkbox
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                  />
                  <EditableSpan
                    value={task.title}
                    onChange={changeTaskTitleHandler}
                  />
                </div>

                {/* <Button onClick={removeTaskHandler} title={"x"} /> */}
                <IconButton aria-label="delete" onClick={removeTaskHandler}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
        </List>
      )}
      <Box sx={filterButtonContainerSX}>
        <Button
          color="secondary"
          variant={filter === "all" ? "outlined" : "contained"}
          onClick={() => changeFilterTasksHandler("all")}
        >
          All
        </Button>
        <Button
          color="error"
          variant={filter === "active" ? "outlined" : "contained"}
          onClick={() => changeFilterTasksHandler("active")}
        >
          Active
        </Button>
        <Button
          color="primary"
          variant={filter === "completed" ? "outlined" : "contained"}
          onClick={() => changeFilterTasksHandler("completed")}
        >
          Completed
        </Button>
      </Box>
    </div>
  );
};
