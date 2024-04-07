export type ProjectFilterType = 'ONGOING' | 'SCHEDULED' | 'COMPLETED';
export type CycleType = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';
export type CountType = 'COUNT' | 'DURATION';
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
    cycleType: CycleType;
    countType: CountType;
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
    cycleType: CycleType;
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
    totalDays: number; // 총 Task 일수(시작~종료)
    elapsedDays: number; // 오늘까지의 경과 일수(시작~ 오늘)
    goal: number; // 목표량
    accumulation: number; // 누적량
    expectedAccumulation: number; // 예상 누적량
    achivementRate: number; // 달성률
    estimatedAchivementRate: number; // 진행률(달성진행률)
    expectedAchivementRate: number; // 예정 달성률
  };
};
