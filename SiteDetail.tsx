import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSites } from '../contexts/SiteContext';
import { Site, Settings, NoRiskSettings, PricingSettings, TestimonialsSettings } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Skeleton from '../components/ui/Skeleton';
import { useToast } from '../contexts/ToastContext';

// Snippet Generator Component
const SnippetGenerator: React.FC<{ siteId: string }> = ({ siteId }) => {
  const [copied, setCopied] = useState(false);
  const snippet = `<script defer src="https://cdn.nudgelift.app/sdk/switchkit.min.js"
  integrity="sha384-PLACEHOLDER_SRI"
  nonce="{{CSP_NONCE}}"
  data-config="https://storage.nudgelift.app/configs/${siteId}.json"
></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card title="Installation Snippet">
      <p className="text-sm text-gray-600 mb-4">
        Copy and paste this snippet into the `<head>` tag of your website.
      </p>
      <div className="bg-gray-900 rounded-md p-4 relative">
        <pre className="text-sm text-gray-200 overflow-x-auto">
          <code>{snippet}</code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </Card>
  );
};

// Form Components (defined in the same file for brevity)
const NoRiskForm: React.FC<{ settings: Partial<NoRiskSettings>, onSave: (data: Partial<NoRiskSettings>) => void }> = ({ settings, onSave }) => {
    const [localSettings, setLocalSettings] = useState(settings);

    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleSave = () => onSave(localSettings);

    return (
        <Card title="No-Risk Offer" description="Reduce purchase anxiety by displaying offers right before the call-to-action." footer={<div className="flex justify-end"><Button onClick={handleSave}>Save</Button></div>}>
            <div className="space-y-4">
                {/* Enable toggle would go here */}
                <Input label="CSS Selector for CTA" id="no-risk-selector" value={localSettings.selector || ''} onChange={e => setLocalSettings({...localSettings, selector: e.target.value})} helperText="e.g., #buy-button, .btn-primary" />
                {/* Other form fields for mode, bullets, etc. would go here */}
            </div>
        </Card>
    )
}

const PricingForm: React.FC<{ settings: Partial<PricingSettings>, onSave: (data: Partial<PricingSettings>) => void }> = ({ settings, onSave }) => {
     const [localSettings, setLocalSettings] = useState(settings);

    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleSave = () => onSave(localSettings);
    
    return (
        <Card title="Pricing Ladder" description="Emphasize your recommended pricing plan." footer={<div className="flex justify-end"><Button onClick={handleSave}>Save</Button></div>}>
            <div className="space-y-4">
                <Input label="Middle Plan ID to Highlight" id="pricing-middle-plan" value={localSettings.middle_plan_id || ''} onChange={e => setLocalSettings({...localSettings, middle_plan_id: e.target.value})} />
                {/* Annual badge toggle would go here */}
            </div>
        </Card>
    )
}

const TestimonialsForm: React.FC<{ settings: Partial<TestimonialsSettings>, onSave: (data: Partial<TestimonialsSettings>) => void }> = ({ settings, onSave }) => {
     const [localSettings, setLocalSettings] = useState(settings);

    useEffect(() => {
        setLocalSettings(settings);
    }, [settings]);

    const handleSave = () => onSave(localSettings);

    return (
        <Card title="Testimonial Forge" description="Optimize social proof by reordering and highlighting reviews." footer={<div className="flex justify-end"><Button onClick={handleSave}>Save</Button></div>}>
            <div className="space-y-4">
                <Input label="Max Items to Display" id="testimonials-max-items" type="number" value={localSettings.max_items || 0} onChange={e => setLocalSettings({...localSettings, max_items: parseInt(e.target.value)})} />
                 {/* Order select would go here */}
            </div>
        </Card>
    )
}


// Main Page Component
const SiteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getSiteById, getSettingsBySiteId, updateSettings } = useSites();
  const [site, setSite] = useState<Site | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const siteData = await getSiteById(id);
        const settingsData = await getSettingsBySiteId(id);
        setSite(siteData || null);
        setSettings(settingsData || null);
      } catch (error) {
        addToast('Failed to load site data.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // FIX: The type for `module` has been narrowed to only include keys of `Settings` that are object types.
  // This prevents a TypeScript error when spreading `settings[module]`, as string-typed properties from `Settings` are excluded.
  const handleSave = async (module: 'no_risk' | 'pricing' | 'testimonials', data: any) => {
    if (!id || !settings) return;
    try {
      await updateSettings(id, { [module]: {...settings[module], ...data} });
      // Refetch settings to get latest state
      const settingsData = await getSettingsBySiteId(id);
      setSettings(settingsData || null);
      addToast(`${module.replace('_', ' ')} settings saved!`, 'success');
    } catch(error) {
       addToast(`Failed to save ${module} settings.`, 'error');
    }
  };

  if (loading) {
    return (
        <div>
            <Skeleton className="h-8 w-64 mb-2"/>
            <Skeleton className="h-6 w-80 mb-8"/>
            <div className="space-y-6">
                <Skeleton className="h-48 w-full"/>
                <Skeleton className="h-64 w-full"/>
            </div>
        </div>
    );
  }

  if (!site) {
    return <div>Site not found. <Link to="/dashboard" className="text-primary-600">Go back</Link></div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/dashboard" className="text-sm text-gray-500 hover:text-gray-700 mb-2 inline-block">
            &larr; Back to Sites
        </Link>
        <h2 className="text-3xl font-bold text-gray-900">{site.name}</h2>
        <p className="text-gray-500">{site.origin}</p>
      </div>

      <SnippetGenerator siteId={site.id} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
            {settings && <NoRiskForm settings={settings.no_risk} onSave={(data) => handleSave('no_risk', data)} />}
            {settings && <PricingForm settings={settings.pricing} onSave={(data) => handleSave('pricing', data)} />}
        </div>
        <div className="space-y-8">
            {settings && <TestimonialsForm settings={settings.testimonials} onSave={(data) => handleSave('testimonials', data)} />}
        </div>
      </div>
    </div>
  );
};

export default SiteDetail;