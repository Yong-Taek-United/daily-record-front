import { AxiosResponse } from 'axios';
import { instanceSSR } from '../authInterceptorWithSSR';
import { TaskEditFormType } from '@/types/tasks';

export async function createTask(
  data: TaskEditFormType
): Promise<AxiosResponse<{ data: TaskEditFormType }, any>> {
  return await instanceSSR.post('/tasks', {
    ...data,
  });
}

export async function updateTask(
  data: TaskEditFormType,
  taskId: number
): Promise<AxiosResponse<{ data: TaskEditFormType }, any>> {
  return await instanceSSR.put(`/tasks/${taskId}`, {
    ...data,
  });
}

export async function deleteTask(
  taskId: number
): Promise<AxiosResponse<{ data: any }, any>> {
  return await instanceSSR.delete(`/tasks/${taskId}`);
}
