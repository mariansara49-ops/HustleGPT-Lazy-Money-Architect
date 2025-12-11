export interface BusinessIdea {
  title: string;
  description: string;
  effortLevel: 'Low' | 'Medium' | 'High';
  potentialRevenue: string;
  setupTime: string;
  tags: string[];
}

export interface BusinessPlan {
  summary: string;
  steps: Array<{
    title: string;
    details: string;
  }>;
  marketingHook: string;
}

export interface GeneratedContent {
  type: 'Tweet' | 'Ad Copy' | 'Email';
  text: string;
}

export enum AppState {
  IDLE,
  GENERATING_IDEA,
  VIEWING_IDEA,
  GENERATING_PLAN,
  VIEWING_PLAN,
  ERROR
}