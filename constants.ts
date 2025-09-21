
import { Plan } from './types';

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    price_annual: 0,
    features: [
      '1 Module',
      'Basic Optimizations',
      'Community Support',
    ],
    sites: '1 Site',
    ai_credits: '50 credits/mo'
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 15,
    price_annual: 13,
    features: [
      'All Modules',
      'A/B Testing Badge',
      'Email Support',
    ],
    sites: '5 Sites',
    ai_credits: '1,000 credits/mo'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    price_annual: 44,
    features: [
      'All Modules Unlimited',
      'AI-Powered Suggestions',
      'Priority Support',
    ],
    sites: '20 Sites',
    ai_credits: 'Unlimited credits'
  },
];
