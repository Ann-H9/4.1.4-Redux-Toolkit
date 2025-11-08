import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, Priority, Status } from "../../../../types";
import { taskList as initialTasks } from "../../../../shared/api/serverData/taskList";

type TasksState = {
  list: Task[];
  showAddEditModal: boolean;
  showDeleteModal: boolean;
  currentTask: Task | null;
  isEditMode: boolean;
};

const initialState: TasksState = {
    list: initialTasks,
    showAddEditModal: false,
    showDeleteModal: false,
    currentTask: null,
    isEditMode: false
}

const taskSlice = createSlice({
    name: "tasks", 
    initialState,
    reducers: {

        openAddTaskModal(state) {
            state.currentTask = null;
            state.isEditMode = false;
            state.showAddEditModal = true
        },

        openEditModal(state, action: PayloadAction<Task>) {
            state.currentTask = action.payload,
            state.isEditMode = true,
            state.showAddEditModal = true
        },

        openDeleteModal(state, action: PayloadAction<Task>) {
            state.currentTask = action.payload,
            state.showDeleteModal = true
        },

        closeModals(state) {
            state.showAddEditModal = false,
            state.showDeleteModal = false
        },

        addTask(state, action: PayloadAction<{ title: string; priority: Priority }>) {
         const newTask: Task = {
             id: Date.now().toString(),
             title: action.payload.title,
             priority: action.payload.priority,
             status: Status.TODO,
             progress: 0,
        };
            state.list.push(newTask);
            state.showAddEditModal = false;
        },

        editTask(state, action: PayloadAction<{ id: string; title: string; priority: Priority }>) {
         const task = state.list.find((t) => t.id === action.payload.id);
            if (task) {
            task.title = action.payload.title;
            task.priority = action.payload.priority;
        }
            state.showAddEditModal = false;
        },

        deleteTask(state, action: PayloadAction<string>) {
            state.list = state.list.filter((t) => t.id !== action.payload);
            state.showDeleteModal = false;
        },
    }
})

export const {
  openAddTaskModal,
  openEditModal,
  openDeleteModal,
  closeModals,
  addTask,
  editTask,
  deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;