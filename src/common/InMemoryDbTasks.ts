// @ts-check

import { DELAY } from 'common/constants';
import { map, remove } from 'lodash';
import { ITask } from 'resources/tasks/task.model';

const TasksData: ITask[] = [];

// GET ALL TASKS
const getAllTasks = (): Promise<ITask[]> => {
  console.log('GET ALL TASKS');
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        const res = TasksData.slice(0);
        console.log('GET ALL TASKS SUCCESS');
        success(res);
      } catch (error) {
        console.log('GET ALL TASKS FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// GET TASK BY BOARD ID AND TASK ID
const getTask = (boardId: string, taskId: string): Promise<ITask> => {
  console.log(`GET TASK BY BOARD ID AND TASK ID...${taskId}`);
  return new Promise((success, failure) => {
    setTimeout(async () => {
      try {
        const allTasks = await getAllTasks();
        const res = allTasks.filter(
          (el) => el?.boardId === boardId && el?.id === taskId
        )[0];
        success(res);
      } catch (error) {
        console.log('GET TASK BY BOARD ID AND TASK ID FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// GET TASK BY ID
const getTaskById = (taskId: string): Promise<ITask> => {
  console.log(`GET TASK BY ID...${taskId}`);
  return new Promise((success, failure) => {
    setTimeout(async () => {
      try {
        const allTasks = await getAllTasks();
        const res = allTasks.filter((el) => el.id === taskId)[0];
        success(res);
      } catch (error) {
        console.log('GET TASK BY ID FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// CREATE TASK
const createTask = (task: ITask): Promise<ITask> => {
  console.log('CREATING TASK...');
  return new Promise((success, failure) => {
    setTimeout(async () => {
      try {
        TasksData.push(task);
        const res = await getTaskById(task.id);
        success(res);
      } catch (error) {
        console.log('FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// UPDATE TASK

const updateTask = async (updatedTask: ITask): Promise<ITask> => {
  console.log('UPDATING TASK...');
  return new Promise((success, failure) => {
    setTimeout(async () => {
      try {
        removeTask(updatedTask.id);
        createTask(updatedTask);
        const res = await getTaskById(updatedTask.id);
        success(res);
      } catch (error) {
        console.log('UPDATING TASK...FAILURE');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

// REMOVE TASK
const removeTask = async (taskId: string): Promise<ITask> => {
  console.log('DELETING TASK...');
  return new Promise((success, failure) => {
    setTimeout(async () => {
      try {
        const deletedTask = await getTaskById(taskId);
        remove(TasksData, (task) => task.id === taskId);
        const res = deletedTask;
        success(res);
      } catch (error) {
        console.log('DELETING TASK');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

const deleteUserFromTasks = (userId: string): Promise<string> => {
  // console.log('DELETING TASK...');
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        map(TasksData, (task) => {
          if (task.userId === userId) {
            removeTask(task.id);
            createTask({ ...task, userId: null });
          }
        });
        success('Delete User From Task is OK');
      } catch (error) {
        // console.log('DELETING TASK');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

const removeTaskByBoardId = (boardId: string): Promise<string> => {
  // console.log('DELETING TASK...');
  return new Promise((success, failure) => {
    setTimeout(() => {
      try {
        remove(TasksData, (task) => task.boardId === boardId);
        success('Delete User From Task is OK');
      } catch (error) {
        // console.log('DELETING TASK');
        failure(new Error('Error: Something went wrong'));
      }
    }, DELAY);
  });
};

export const DBTasks = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  removeTask,
  deleteUserFromTasks,
  removeTaskByBoardId,
};
