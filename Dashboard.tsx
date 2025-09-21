
import React, { useState } from 'react';
import { useSites } from '../contexts/SiteContext';
import { Site } from '../types';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { useToast } from '../contexts/ToastContext';
import Skeleton from '../components/ui/Skeleton';

const SiteCard: React.FC<{ site: Site }> = ({ site }) => (
  <Card className="hover:shadow-lg transition-shadow duration-200">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{site.name}</h3>
        <p className="text-sm text-gray-500">{site.origin}</p>
      </div>
      <Link to={`/sites/${site.id}`}>
        <Button variant="secondary" size="sm">Manage</Button>
      </Link>
    </div>
  </Card>
);

const SiteSkeleton: React.FC = () => (
    <Card>
        <div className="flex justify-between items-start">
            <div>
                <Skeleton className="h-6 w-40 mb-2"/>
                <Skeleton className="h-4 w-48"/>
            </div>
            <Skeleton className="h-8 w-20"/>
        </div>
    </Card>
);

const EmptyState: React.FC<{ onOpenModal: () => void }> = ({ onOpenModal }) => (
    <div className="text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No sites</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new site.</p>
        <div className="mt-6">
            <Button onClick={onOpenModal}>
                <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                New Site
            </Button>
        </div>
    </div>
);


const Dashboard: React.FC = () => {
  const { sites, loading, createSite } = useSites();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteOrigin, setNewSiteOrigin] = useState('');
  const { addToast } = useToast();

  const handleCreateSite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newSiteName && newSiteOrigin) {
      try {
        await createSite(newSiteName, newSiteOrigin);
        addToast('Site created successfully!', 'success');
        setIsModalOpen(false);
        setNewSiteName('');
        setNewSiteOrigin('');
      } catch (error) {
        addToast('Failed to create site.', 'error');
      }
    }
  };

  return (
    <div>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Sites</h2>
            {sites.length > 0 && <Button onClick={() => setIsModalOpen(true)}>New Site</Button>}
        </div>

        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SiteSkeleton />
                <SiteSkeleton />
                <SiteSkeleton />
            </div>
        ) : sites.length === 0 ? (
            <Card>
                <EmptyState onOpenModal={() => setIsModalOpen(true)} />
            </Card>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sites.map((site) => (
                <SiteCard key={site.id} site={site} />
                ))}
            </div>
        )}

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Site">
            <form onSubmit={handleCreateSite} className="space-y-4">
                <Input 
                    label="Site Name" 
                    id="site-name" 
                    value={newSiteName} 
                    onChange={(e) => setNewSiteName(e.target.value)}
                    placeholder="My Awesome Project"
                    required 
                />
                 <Input 
                    label="Site Origin URL" 
                    id="site-origin" 
                    type="url"
                    value={newSiteOrigin} 
                    onChange={(e) => setNewSiteOrigin(e.target.value)}
                    placeholder="https://example.com"
                    required 
                />
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 -mx-6 -mb-4 rounded-b-lg">
                    <Button type="submit" disabled={loading}>Create</Button>
                    <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)} className="mr-3">
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    </div>
  );
};

export default Dashboard;
