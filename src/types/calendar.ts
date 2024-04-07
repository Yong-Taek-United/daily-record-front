import { CountType, CycleType } from './projects';
export type ActivityType = {
  id: number;
  title: string;
  description: string;
  actedDate: string;
  actedTime: string;
  filledGoal: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  category: {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  project: {
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
  };
  task: {
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
      cycleType: CycleType;
      countType: CountType;
      cycleCount: number;
      goal: number;
      accumulation: number;
      isWeekendsExcl: boolean;
      isActive: boolean;
      isCompleted: boolean;
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
      iconType: string;
      iconName: string;
      isActive: boolean;
      createdAt: Date;
      updatedAt: Date;
    };
  };
  activityFile: [];
};

export type CalendarDataType = {
  actedDate: string;
  actedDay: number;
  activities: ActivityType[];
};
