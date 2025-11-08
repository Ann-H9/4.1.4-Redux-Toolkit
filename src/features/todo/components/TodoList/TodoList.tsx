import { Button } from '../../../../shared/ui/Button/Button';
import { AddEditTaskModal } from '../../modals/AddEditTaskModal/AddEditTaskModal';
import { DeleteModal } from '../../modals/DeleteModal/DeleteModal';
import { TaskCard } from '../TaskCard/TaskCard';
import Add from '@/shared/assets/icons/add.svg?react';
import styles from '@/features/todo/components/TodoList/TodoList.module.scss';
import { Priority } from '../../../../types';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  openAddTaskModal,
  openEditModal,
  openDeleteModal,
  closeModals,
  addTask,
  editTask,
  deleteTask,
} from '../../components/TodoList/TodoListSlice';

export const TodoList = () => {
  const dispatch = useAppDispatch();
  const {
    list: tasks,
    showAddEditModal,
    showDeleteModal,
    currentTask,
    isEditMode,
  } = useAppSelector((state) => state.tasks);

  const handleSaveTask = (taskData: { title: string; priority: Priority }) => {
    if (isEditMode && currentTask) {
      dispatch(editTask({ id: currentTask.id, ...taskData }));
    } else {
      dispatch(addTask(taskData));
    }
  };

  const handleDeleteTask = () => {
    if (currentTask) {
      dispatch(deleteTask(currentTask.id));
    }
  };

  return (
    <>
      <div className={styles['page-wrapper']}>
        <div className={styles['top-title']}>
          <h2>Список задач</h2>
          <Button
            title="Добавить задачу"
            icon={<Add />}
            onClick={() => dispatch(openAddTaskModal())}
          />
        </div>
        <div className="task-container">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => dispatch(openEditModal(task))}
              onDelete={() => dispatch(openDeleteModal(task))}
            />
          ))}
        </div>
      </div>

      {showAddEditModal && (
        <AddEditTaskModal
          isEditMode={isEditMode}
          task={currentTask}
          onSave={handleSaveTask}
          onClose={() => dispatch(closeModals())}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          onDelete={handleDeleteTask}
          onClose={() => dispatch(closeModals())}
        />
      )}
    </>
  );
};