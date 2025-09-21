
export interface User {
  id: string;
  email: string;
  plan: 'free' | 'starter' | 'pro';
}

export interface Site {
  id: string;
  user_id: string;
  name: string;
  origin: string;
  created_at: string;
}

export interface NoRiskSettings {
  enabled: boolean;
  mode: 'trial_only' | 'soft_guarantee' | 'refund';
  bullets: string[];
  selector: string;
}

export interface PricingSettings {
  enabled: boolean;
  middle_plan_id: string;
  annual_badge: boolean;
}

export interface TestimonialsSettings {
  enabled: boolean;
  order: 'impact' | 'date' | 'relevance';
  max_items: number;
}

export interface Settings {
  site_id: string;
  no_risk: Partial<NoRiskSettings>;
  pricing: Partial<PricingSettings>;
  testimonials: Partial<TestimonialsSettings>;
  updated_at: string;
}

export type PlanId = 'free' | 'starter' | 'pro';

export interface Plan {
  id: PlanId;
  name: string;
  price: number;
  price_annual: number;
  features: string[];
  sites: string;
  ai_credits: string;
}
