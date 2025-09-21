
import React, { useState } from 'react';
import { PLANS } from '../constants';
import { Plan } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const CheckIcon: React.FC = () => (
    <svg className="h-6 w-5 flex-none text-primary-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const PlanCard: React.FC<{ plan: Plan; isCurrentPlan: boolean; billingCycle: 'monthly' | 'annually' }> = ({ plan, isCurrentPlan, billingCycle }) => {
  const price = billingCycle === 'annually' ? plan.price_annual : plan.price;
  const priceSuffix = plan.price > 0 ? (billingCycle === 'annually' ? '/ year' : '/ month') : '';

  return (
    <Card className={`flex flex-col h-full ${plan.name === 'Starter' ? 'ring-2 ring-primary-600' : ''}`}>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
        <p className="mt-4 flex items-baseline text-gray-900">
          <span className="text-4xl font-bold tracking-tight">${price}</span>
          <span className="ml-1 text-sm font-semibold leading-6 text-gray-600">{priceSuffix}</span>
        </p>
        <p className="mt-6 text-sm leading-6 text-gray-600">{plan.sites} &bull; {plan.ai_credits}</p>
        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
          {plan.features.map(feature => (
            <li key={feature} className="flex gap-x-3">
              <CheckIcon />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <Button
        className="mt-8 w-full"
        variant={plan.name === 'Starter' ? 'primary' : 'secondary'}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? 'Current Plan' : 'Choose Plan'}
      </Button>
    </Card>
  );
};

const Billing: React.FC = () => {
    const { user } = useAuth();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Billing</h2>
            <p className="text-gray-600 mb-8">Manage your subscription and billing details.</p>

            <div className="flex justify-center items-center mb-10">
                <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-primary-600' : 'text-gray-500'}`}>Monthly</span>
                <button
                    type="button"
                    className={`relative mx-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 ${billingCycle === 'annually' ? 'bg-primary-600' : 'bg-gray-200'}`}
                    role="switch"
                    aria-checked={billingCycle === 'annually'}
                    onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'annually' : 'monthly')}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${billingCycle === 'annually' ? 'translate-x-5' : 'translate-x-0'}`}
                    ></span>
                </button>
                <span className={`text-sm font-medium ${billingCycle === 'annually' ? 'text-primary-600' : 'text-gray-500'}`}>Annually</span>
                <span className="ml-2 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">Save 10%</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {PLANS.map(plan => (
                    <PlanCard 
                        key={plan.id} 
                        plan={plan} 
                        isCurrentPlan={user?.plan === plan.id}
                        billingCycle={billingCycle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Billing;
