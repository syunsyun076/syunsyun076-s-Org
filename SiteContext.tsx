
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Site, Settings } from '../types';
import { useAuth } from './AuthContext';

// MOCK DATA
const initialSites: Site[] = [
    { id: '1', user_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', name: 'My SaaS Product', origin: 'https://mysaas.com', created_at: new Date().toISOString() },
    { id: '2', user_id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef', name: 'E-commerce Store', origin: 'https://mystore.com', created_at: new Date().toISOString() },
];

const initialSettings: { [key: string]: Settings } = {
    '1': {
        site_id: '1',
        no_risk: { enabled: true, mode: 'refund', bullets: ['30-day money back guarantee', 'Cancel anytime'], selector: '#checkout-button' },
        pricing: { enabled: true, middle_plan_id: 'plan_starter', annual_badge: true },
        testimonials: { enabled: false, order: 'impact', max_items: 10 },
        updated_at: new Date().toISOString(),
    },
    '2': {
        site_id: '2',
        no_risk: { enabled: false, mode: 'trial_only', bullets: [], selector: '' },
        pricing: { enabled: false, middle_plan_id: '', annual_badge: false },
        testimonials: { enabled: true, order: 'date', max_items: 20 },
        updated_at: new Date().toISOString(),
    }
};

interface SiteContextType {
  sites: Site[];
  loading: boolean;
  getSiteById: (id: string) => Promise<Site | undefined>;
  getSettingsBySiteId: (siteId: string) => Promise<Settings | undefined>;
  createSite: (name: string, origin: string) => Promise<Site>;
  updateSettings: (siteId: string, newSettings: Partial<Settings>) => Promise<Settings>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [sites, setSites] = useState<Site[]>([]);
  const [settings, setSettings] = useState<{ [key: string]: Settings }>(initialSettings);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchSites = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    // Simulate API call
    await new Promise(res => setTimeout(res, 500));
    setSites(initialSites.filter(s => s.user_id === user.id));
    setLoading(false);
  }, [user]);
  
  useEffect(() => {
    fetchSites();
  }, [fetchSites]);

  const getSiteById = async (id: string): Promise<Site | undefined> => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 300));
    const site = sites.find(s => s.id === id);
    setLoading(false);
    return site;
  };

  const getSettingsBySiteId = async (siteId: string): Promise<Settings | undefined> => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 300));
    const siteSettings = settings[siteId];
    setLoading(false);
    return siteSettings;
  };

  const createSite = async (name: string, origin: string): Promise<Site> => {
    if (!user) throw new Error("User not authenticated");
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));
    const newSite: Site = {
        id: (Math.random() + 1).toString(36).substring(7),
        user_id: user.id,
        name,
        origin,
        created_at: new Date().toISOString()
    };
    setSites(prev => [...prev, newSite]);
    setLoading(false);
    return newSite;
  };
  
  const updateSettings = async (siteId: string, newSettings: Partial<Settings>): Promise<Settings> => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));
    const updatedSettings = { ...settings[siteId], ...newSettings, updated_at: new Date().toISOString() };
    setSettings(prev => ({ ...prev, [siteId]: updatedSettings }));
    setLoading(false);
    return updatedSettings;
  };


  return (
    <SiteContext.Provider value={{ sites, loading, getSiteById, getSettingsBySiteId, createSite, updateSettings }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSites = (): SiteContextType => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSites must be used within a SiteProvider');
  }
  return context;
};
