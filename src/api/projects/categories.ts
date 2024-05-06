import { AxiosResponse } from 'axios';
import { instanceSSR } from '../authInterceptorWithSSR';

export type ColorsType = {
  id: number;
  colorCode: string;
  isActive: boolean;
};

export type TaskCategoriesType = {
  id: number;
  name: string;
  isActive: boolean;
};

export type MyProjectCategoriesType = {
  id: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  isDeleted: boolean;
};

export type MyTaskCategoriesType = {
  id: number;
  title: string;
  isActive: boolean;
  isCompleted: boolean;
  isDeleted: boolean;
};

export async function getColors(): Promise<
  AxiosResponse<{ data: ColorsType[] }, any>
> {
  return await instanceSSR.get('/colors/list');
}

export async function getTaskCategories(): Promise<
  AxiosResponse<{ data: TaskCategoriesType[] }, any>
> {
  return await instanceSSR.get('/categories/list');
}

export async function getMyProjectCategories(): Promise<
  AxiosResponse<{ data: MyProjectCategoriesType[] }, any>
> {
  return await instanceSSR.get('/projects/self/list/for-activity');
}

export async function getMyTaskCategories(
  projectId: number
): Promise<AxiosResponse<{ data: MyTaskCategoriesType[] }, any>> {
  return await instanceSSR.get(`/tasks/self/${projectId}/list/for-activity`);
}
