import { AxiosResponse } from 'axios';
import { TasksTypes } from '@/types/projects';
import { instanceSSR } from '../authInterceptorWithSSR';

export type GetProjectsParams = {
  listSkip: number;
  listTake: number;
  projectStatus: 'ONGOING' | 'SCHEDULED' | 'COMPLETED';
};

export type GetProjectsRes = {
  id: number;
  title: string;
  description: string;
  startedAt: string;
  finishedAt: string;
  isActive: boolean;
  isCompleted: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: string;
};
export type CreateProjectReq = {
  title: string;
  description: string;
  startedAt: string;
  finishedAt: string;
  isActive: boolean;
};
export async function getProjects({
  listSkip,
  listTake,
  projectStatus,
}: GetProjectsParams): Promise<AxiosResponse<{ data: GetProjectsRes[] }, any>> {
  return await instanceSSR.get('/projects/list', {
    params: { listSkip, listTake, projectStatus },
  });
}

export async function getTasks({
  projectId,
}: {
  projectId: number;
}): Promise<AxiosResponse<{ data: TasksTypes[] }>> {
  return await instanceSSR.get(`/tasks/list/${projectId}`);
}

export async function createProject(
  data: CreateProjectReq
): Promise<AxiosResponse<{ data: any }, any>> {
  return await instanceSSR.post('/projects', {
    ...data,
  });
}

export async function getProjectDetail(
  projectId: number
): Promise<AxiosResponse<{ data: any }>> {
  return await instanceSSR.get(`/projects/${projectId}`);
}

export async function updateProject(
  data: CreateProjectReq,
  projectId: number
): Promise<AxiosResponse<{ data: any }>> {
  return await instanceSSR.put(`/projects/${projectId}`, {
    ...data,
  });
}
