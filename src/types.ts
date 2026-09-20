export interface FeatureModule {
  id: string;
  title: string;
  badge?: {
    text: string;
    variant: 'hot' | 'pro' | 'new';
  };
  icon: string;
  description: string;
  tags: string[];
  color: string;
  lightBg: string;
  fullDetails?: string[];
}

export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  iconName?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  cents: string;
  billingPeriod: string;
  perMonth: string;
  saveBadge?: string;
  popular?: boolean;
  features: string[];
  whatsappText: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarLetter: string;
  stars: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SpecRow {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface AutomationBatch {
  id: string;
  name: string;
  moduleTitle: string;
  targetCount: number;
  completedCount: number;
  status: 'queued' | 'scheduled' | 'running' | 'resting' | 'paused' | 'completed';
  scheduledStartTime: string;
  scheduledStartTimeFormatted: string;
  startDelayRemainingSeconds?: number;
  minDelaySec: number;
  maxDelaySec: number;
  delayDistribution: 'gaussian' | 'uniform' | 'exponential';
  coffeeBreakEnabled: boolean;
  coffeeBreakEvery: number;
  coffeeBreakDurationMin: number;
  circadianEnabled: boolean;
  circadianWindow: string;
  assignedProxy: string;
  threads: number;
  currentActionLog?: string;
  nextAccountDelaySeconds?: number;
  historyLogs?: { timestamp: string; accountIndex: number; delayTakenSec: number; event: string }[];
}
