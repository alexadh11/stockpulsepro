import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { DemandRadar } from './components/DemandRadar';
import { AiDecider } from './components/AiDecider';
import { KeywordGenerator } from './components/KeywordGenerator';
import { BuyerGeoTracker } from './components/BuyerGeoTracker';
import { BatchCsvExporter } from './components/BatchCsvExporter';
import { ThemeMode, TrendingNiche, BatchItem } from './types';
import { ShieldCheck, Sparkles, ExternalLink, Flame, Scroll, Sun, Moon } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('black-hole');
  const [activeTab, setActiveTab] = useState<'radar' | 'decider' | 'seo' | 'geo' | 'batch'>('radar');

  // Shared state for cross-tab workflow
  const [seoPrompt, setSeoPrompt] = useState<string>('');
  const [seoAssetType, setSeoAssetType] = useState<string>('AI Photo');
  const [seoStyle, setSeoStyle] = useState<string>('Commercial');

  // Batch queue with initial high-converting assets
  const [batchItems, setBatchItems] = useState<BatchItem[]>([
    {
      id: 'batch-init-1',
      filename: 'clean_hydrogen_electrolyzer_facility_01.jpg',
      title: 'Clean Hydrogen Electrolyzer Production Facility with Green Energy Turbines',
      category: 'Industry',
      keywords: [
        'hydrogen energy', 'green hydrogen', 'electrolyzer', 'clean energy', 'renewable energy',
        'industrial plant', 'sustainability', 'net zero', 'carbon neutral', 'energy transition',
        'power generation', 'factory', 'fuel cell', 'technology', 'innovation', 'power', 'modern',
      ],
      assetType: 'AI Photo',
      isAi: true,
    },
    {
      id: 'batch-init-2',
      filename: 'saas_ai_agent_workflow_diagram.eps',
      title: 'AI Automation Agent Workflow Process with Isometric Server Dashboard',
      category: 'Graphic Resources',
      keywords: [
        'ai agents', 'workflow automation', 'isometric vector', 'process flow', 'robotic process automation',
        'data pipeline', 'cloud computing', 'saas software', 'business efficiency', 'machine learning',
        'infographic', 'technology concept', 'api integration', 'server cluster', 'vector graphic',
      ],
      assetType: 'Vector',
      isAi: false,
    },
    {
      id: 'batch-init-3',
      filename: 'senior_telehealth_digital_consultation.jpg',
      title: 'Elderly Woman Consulting Online Doctor via Digital Tablet at Home',
      category: 'People',
      keywords: [
        'telehealth', 'telemedicine', 'senior healthcare', 'online doctor', 'digital tablet',
        'elderly patient', 'virtual consultation', 'video call', 'medical checkup', 'home care',
        'wellness', 'health clinic', 'technology', 'remote medicine', 'authentic emotion',
      ],
      assetType: 'Authentic Photo',
      isAi: false,
    },
  ]);

  // Sync theme with document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleSelectNicheForSeo = (niche: TrendingNiche) => {
    setSeoPrompt(niche.keyword);
    setSeoAssetType(niche.assetType);
    setSeoStyle(niche.category);
    setActiveTab('seo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendDeciderToSeo = (info: {
    description: string;
    assetType: string;
    style: string;
    isAi: boolean;
  }) => {
    setSeoPrompt(info.description);
    setSeoAssetType(info.assetType);
    setSeoStyle(info.style);
    setActiveTab('seo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToBatch = (item: {
    title: string;
    keywords: string[];
    category: string;
    assetType: string;
    isAi: boolean;
  }) => {
    const filenamePrefix = item.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .slice(0, 30);
    const extension = item.assetType === 'Vector' ? 'eps' : 'jpg';

    const newItem: BatchItem = {
      id: `batch-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      filename: `${filenamePrefix}_${Math.floor(100 + Math.random() * 900)}.${extension}`,
      title: item.title,
      keywords: item.keywords,
      category: item.category,
      assetType: item.assetType,
      isAi: item.isAi,
    };

    setBatchItems((prev) => [newItem, ...prev]);
  };

  const handleRemoveBatchItem = (id: string) => {
    setBatchItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearBatch = () => {
    setBatchItems([]);
  };

  const handleManualAddBatch = (item: Omit<BatchItem, 'id'>) => {
    const newItem: BatchItem = {
      ...item,
      id: `batch-${Date.now()}`,
    };
    setBatchItems((prev) => [newItem, ...prev]);
  };

  return (
    <div
      data-theme={theme}
      className="min-h-screen flex flex-col transition-colors duration-500 relative"
      style={{
        backgroundColor: 'var(--theme-bg)',
        color: 'var(--theme-text)',
        fontFamily: 'var(--theme-font)',
      }}
    >
      {/* Dynamic Ambient Background Elements based on active theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        {theme === 'angel' && (
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: 'rgba(245, 158, 11, 0.25)' }}
          />
        )}
        {theme === 'black-hole' && (
          <>
            <div
              className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-[140px]"
              style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)' }}
            />
            <div
              className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full blur-[120px]"
              style={{ backgroundColor: 'rgba(6, 182, 212, 0.15)' }}
            />
          </>
        )}
        {theme === 'dragon-fire' && (
          <div
            className="absolute top-10 right-10 w-[600px] h-[600px] rounded-full blur-[140px]"
            style={{ backgroundColor: 'rgba(255, 69, 0, 0.2)' }}
          />
        )}
        {theme === 'dragon-frost' && (
          <div
            className="absolute top-10 left-10 w-[600px] h-[600px] rounded-full blur-[140px]"
            style={{ backgroundColor: 'rgba(56, 189, 248, 0.2)' }}
          />
        )}
        {theme === 'dragon-void' && (
          <div
            className="absolute top-10 right-10 w-[600px] h-[600px] rounded-full blur-[140px]"
            style={{ backgroundColor: 'rgba(16, 185, 129, 0.18)' }}
          />
        )}
        {theme === 'dragon-storm' && (
          <div
            className="absolute top-10 left-10 w-[600px] h-[600px] rounded-full blur-[140px]"
            style={{ backgroundColor: 'rgba(234, 179, 8, 0.18)' }}
          />
        )}
      </div>

      {/* Top Header & Navbar */}
      <Navbar
        currentTheme={theme}
        onSelectTheme={setTheme}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        batchCount={batchItems.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 z-10 relative">
        {activeTab === 'radar' && (
          <DemandRadar
            onSelectNicheForSeo={handleSelectNicheForSeo}
            onAddToBatch={handleAddToBatch}
          />
        )}

        {activeTab === 'decider' && (
          <AiDecider
            onSendToSeo={handleSendDeciderToSeo}
            onAddToBatch={handleAddToBatch}
          />
        )}

        {activeTab === 'seo' && (
          <KeywordGenerator
            initialPrompt={seoPrompt}
            initialAssetType={seoAssetType}
            initialStyle={seoStyle}
            onAddToBatch={handleAddToBatch}
          />
        )}

        {activeTab === 'geo' && <BuyerGeoTracker />}

        {activeTab === 'batch' && (
          <BatchCsvExporter
            batchItems={batchItems}
            onRemoveItem={handleRemoveBatchItem}
            onClearBatch={handleClearBatch}
            onAddItem={handleManualAddBatch}
          />
        )}
      </main>

      {/* Footer */}
      <footer
        className="border-t py-8 px-4 sm:px-6 text-xs transition-colors z-10 mt-auto"
        style={{
          backgroundColor: 'var(--theme-card)',
          borderColor: 'var(--theme-border)',
          color: 'var(--theme-text-muted)',
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs"
              style={{ backgroundColor: 'var(--theme-accent)', color: '#ffffff' }}
            >
              SP
            </div>
            <span className="font-bold text-sm" style={{ color: 'var(--theme-text)' }}>
              StockPulse Pro for Adobe Stock Contributors
            </span>
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Adobe Contributor Guidelines Compliant</span>
            </span>
            <span>•</span>
            <span>StockRank™ 10-Keyword Algorithm</span>
            <span>•</span>
            <span>GDPR-Safe Buyer Demographics</span>
            <span>•</span>
            <span className="capitalize">Active Mode: <strong>{theme.replace('-', ' ')}</strong></span>
          </div>

          <div className="text-[11px] opacity-90 font-medium">
            © {new Date().getFullYear()} StockPulse Pro. Created by <strong style={{ color: 'var(--theme-text)' }}>Alex Adhikary</strong>. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
