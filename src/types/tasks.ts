import { CountType, CycleType } from './projects';

export type TaskEditFormType = {
  title: string;
  description: string;
  startedAt: string;
  finishedAt: string;
  project: {
    id: number;
  };
  category: {
    id: number;
  };
  color: {
    id: number;
  };
  icon: {
    id: number;
  };
  taskGoal: {
    id?: number;
    countType: CountType;
    cycleType: CycleType;
    cycleCount: number;
    goal: number;
    isWeekendsExcl: boolean;
  };
  taskPush: {
    id?: number;
    cycleType: CycleType;
    pushTime: string;
    isPushEnabled: boolean;
  };
};
