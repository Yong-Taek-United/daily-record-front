export type ProjectFilterType = 'ONGOING' | 'SCHEDULED' | 'COMPLETED';

export type TasksTypes = {
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
  deletedAt: Date;
  taskGoal: {
    id: number;
    cycleType: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
    countType: 'COUNT' | 'DURATION';
    cycleCount: number;
    goal: number;
    accumulation: number; // 누적 값
    isWeekendsExcl: boolean; // 주말 제외 여부
    isActive: boolean;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  taskPush: {
    id: number;
    cycleType: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
    pushTime: string;
    isPushEnabled: boolean;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  category: {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  color: {
    id: number;
    colorCode: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  icon: {
    id: number;
    iconType: 'TASK' | 'MEDAL';
    iconName: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  progressData: {
    totalDays: number;
    elapsedDays: number;
    goal: number;
    accumulation: number;
    expectedAccumulation: number;
    achivementRate: number;
    estimatedAchivementRate: number;
  };
};
