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
