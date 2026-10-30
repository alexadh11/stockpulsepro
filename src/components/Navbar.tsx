import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Flame,
  Scroll,
  Sparkles,
  BarChart3,
  SearchCode,
  Tag,
  Globe2,
  FileSpreadsheet,
  ChevronDown,
  Clock,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  currentTheme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
  activeTab: 'radar' | 'decider' | 'seo' | 'geo' | 'batch';
  onSelectTab: (tab: 'radar' | 'decider' | 'seo' | 'geo' | 'batch') => void;
  batchCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onSelectTheme,
  activeTab,
  onSelectTab,
  batchCount,
}) => {
  const [dragonDropdownOpen, setDragonDropdownOpen] = useState(false);
  const [historyDropdownOpen, setHistoryDropdownOpen] = useState(false);

  const isDragon = currentTheme.startsWith('dragon-');
  const isHistorical = currentTheme.startsWith('historical-');

  const getDragonLabel = (t: string) => {
    switch (t) {
      case 'dragon-fire':
        return 'Fire & Magma';
      case 'dragon-frost':
        return 'Frost & Glacier';
      case 'dragon-void':
        return 'Shadow Void';
      case 'dragon-storm':
        return 'Storm Thunder';
      default:
        return 'Dragon Mode';
    }
  };

  const getHistoricalLabel = (t: string) => {
    switch (t) {
      case 'historical-parchment':
        return 'Renaissance';
      case 'historical-edo':
        return 'Edo Japan';
      case 'historical-rome':
        return 'Classical Rome';
      case 'historical-steampunk':
        return 'Steampunk';
      default:
        return 'Historical Mode';
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300"
      style={{
        backgroundColor: 'var(--theme-card)',
        borderColor: 'var(--theme-border)',
      }}
    >
      {/* Top Meta Bar */}
      <div className="border-b px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-3"
        style={{
          borderColor: 'var(--theme-border)',
          backgroundColor: 'var(--theme-card-subtle)',
          color: 'var(--theme-text-muted)',
        }}
      >
        <div className="flex items-center gap-4 flex-wrap">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--theme-accent)' }}></span>
            <span>Adobe Stock Contributor Engine: <strong className="text-white" style={{ color: 'var(--theme-text)' }}>Active & Calibrated</strong></span>
          </span>
          <span className="hidden sm:inline-block opacity-40">•</span>
          <span className="hidden sm:inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 opacity-70" />
            <span>US & European Peak Buying Hours: <strong style={{ color: 'var(--theme-text)' }}>14:00 - 22:00 UTC</strong></span>
          </span>
          <span className="hidden md:inline-block opacity-40">•</span>
          <span className="hidden md:inline-flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 opacity-70" />
            <span>100% Adobe AI Policy Safe: Prevents Mislabeling Rejections</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold"
            style={{
              backgroundColor: 'var(--theme-badge-bg)',
              color: 'var(--theme-badge-text)',
            }}
          >
            Algorithm v2026.4
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('radar')}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shadow-lg transition-transform hover:scale-105"
            style={{
              backgroundColor: 'var(--theme-accent)',
              color: '#ffffff',
              boxShadow: '0 0 16px var(--theme-accent-glow)',
            }}
          >
            SP
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--theme-text)' }}>
                StockPulse <span style={{ color: 'var(--theme-accent)' }}>Pro</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: 'var(--theme-badge-bg)',
                  color: 'var(--theme-badge-text)',
                  border: '1px solid var(--theme-border-highlight)',
                }}
              >
                Contributor Suite
              </span>
            </div>
            <p className="text-xs font-medium" style={{ color: 'var(--theme-text-muted)' }}>
              Adobe Stock Trending Demands & SEO Rank Optimizer
            </p>
          </div>
        </div>

        {/* Dynamic Multi-Theme Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border backdrop-blur-md"
          style={{
            backgroundColor: 'var(--theme-card-subtle)',
            borderColor: 'var(--theme-border)',
          }}
        >
          {/* Angel Mode */}
          <button
            onClick={() => {
              setDragonDropdownOpen(false);
              setHistoryDropdownOpen(false);
              onSelectTheme('angel');
            }}
            title="Angel Mode: Radiant divine light, golden halos, pristine white"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTheme === 'angel'
                ? 'shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={
              currentTheme === 'angel'
                ? {
                    backgroundColor: 'var(--theme-accent)',
                    color: '#ffffff',
                    boxShadow: '0 0 12px var(--theme-accent-glow)',
                  }
                : { color: 'var(--theme-text)' }
            }
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Angel</span>
          </button>

          {/* Black Hole Mode */}
          <button
            onClick={() => {
              setDragonDropdownOpen(false);
              setHistoryDropdownOpen(false);
              onSelectTheme('black-hole');
            }}
            title="Black Hole Mode: Deep OLED singularity, violet accretion disc"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentTheme === 'black-hole'
                ? 'shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={
              currentTheme === 'black-hole'
                ? {
                    backgroundColor: 'var(--theme-accent)',
                    color: '#ffffff',
                    boxShadow: '0 0 12px var(--theme-accent-glow)',
                  }
                : { color: 'var(--theme-text)' }
            }
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Black Hole</span>
          </button>

          {/* Dragon Mode with Sub-elements */}
          <div className="relative">
            <button
              onClick={() => {
                setHistoryDropdownOpen(false);
                setDragonDropdownOpen(!dragonDropdownOpen);
                if (!isDragon) onSelectTheme('dragon-fire');
              }}
              title="Dragon Mode: All dragon elemental types (Fire, Frost, Void, Storm)"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isDragon ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
              }`}
              style={
                isDragon
                  ? {
                      backgroundColor: 'var(--theme-accent)',
                      color: '#ffffff',
                      boxShadow: '0 0 12px var(--theme-accent-glow)',
                    }
                  : { color: 'var(--theme-text)' }
              }
            >
              <Flame className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isDragon ? getDragonLabel(currentTheme) : 'Dragon'}</span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
            </button>

            {dragonDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-xl p-1.5 shadow-2xl border z-50 text-xs flex flex-col gap-1 backdrop-blur-xl"
                style={{
                  backgroundColor: 'var(--theme-card)',
                  borderColor: 'var(--theme-border-highlight)',
                  color: 'var(--theme-text)',
                }}
              >
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider opacity-60">
                  Dragon Elements
                </div>
                <button
                  onClick={() => {
                    onSelectTheme('dragon-fire');
                    setDragonDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    currentTheme === 'dragon-fire' ? 'font-bold' : 'hover:bg-white/10'
                  }`}
                  style={currentTheme === 'dragon-fire' ? { backgroundColor: 'var(--theme-badge-bg)', color: 'var(--theme-accent)' } : {}}
                >
                  <span>🌋 Fire & Magma Dragon</span>
                </button>
                <button
                  onClick={() => {
                    onSelectTheme('dragon-frost');
                    setDragonDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    currentTheme === 'dragon-frost' ? 'font-bold' : 'hover:bg-white/10'
                  }`}
                  style={currentTheme === 'dragon-frost' ? { backgroundColor: 'var(--theme-badge-bg)', color: 'var(--theme-accent)' } : {}}
                >
                  <span>❄️ Frost & Ice Dragon</span>
                </button>
                <button
                  onClick={() => {
                    onSelectTheme('dragon-void');
                    setDragonDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    currentTheme === 'dragon-void' ? 'font-bold' : 'hover:bg-white/10'
                  }`}
                  style={currentTheme === 'dragon-void' ? { backgroundColor: 'var(--theme-badge-bg)', color: 'var(--theme-accent)' } : {}}
                >
                  <span>🌑 Shadow Void Dragon</span>
                </button>
                <button
                  onClick={() => {
                    onSelectTheme('dragon-storm');
                    setDragonDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    currentTheme === 'dragon-storm' ? 'font-bold' : 'hover:bg-white/10'
                  }`}
                  style={currentTheme === 'dragon-storm' ? { backgroundColor: 'var(--theme-badge-bg)', color: 'var(--theme-accent)' } : {}}
                >
                  <span>⚡ Storm Lightning Dragon</span>
                </button>
              </div>
            )}
          </div>

          {/* Historical Mode with Switchable Eras */}
          <div className="relative">
            <button
              onClick={() => {
                setDragonDropdownOpen(false);
                setHistoryDropdownOpen(!historyDropdownOpen);
                if (!isHistorical) onSelectTheme('historical-parchment');
              }}
              title="Historical Mode: Switched historical eras (Renaissance, Edo Dynasty, Rome, Steampunk)"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isHistorical ? 'shadow-sm' : 'opacity-70 hover:opacity-100'
              }`}
              style={
                isHistorical
                  ? {
                      backgroundColor: 'var(--theme-accent)',
                      color: '#ffffff',
                      boxShadow: '0 0 12px var(--theme-accent-glow)',
                    }
                  : { color: 'var(--theme-text)' }
              }
            >
              <Scroll className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isHistorical ? getHistoricalLabel(currentTheme) : 'Historical'}</span>
              <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
            </button>

            {historyDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-52 rounded-xl p-1.5 shadow-2xl border z-50 text-xs flex flex-col gap-1 backdrop-blur-xl"
                style={{
                  backgroundColor: 'var(--theme-card)',
                  borderColor: 'var(--theme-border-highlight)',
                  color: 'var(--theme-text)',
                }}
              >
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider opacity-60">
                  Historical Eras
                </div>
                <button
                  onClick={() => {
                    onSelectTheme('historical-parchment');
                    setHistoryDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    currentTheme === 'historical-parchment' ? 'font-bold' : 'hover:bg-white/10'
                  }`}
                  style={currentTheme === 'historical-parchment' ? { backgroundColor: 'var(--theme-badge-bg)', color: 'var(--theme-accent)' } : {}}
                >
                  <span>📜 Victorian & Renaissance</span>
                </button>
                <button
                  onClick={() => {
                    onSelectTheme('historical-edo');
                    setHistoryDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    currentTheme === 'historical-edo' ? 'font-bold' : 'hover:bg-white/10'
                  }`}
                  style={currentTheme === 'historical-edo' ? { backgroundColor: 'var(--theme-badge-bg)', color: 'var(--theme-accent)' } : {}}
                >
                  <span>⛩️ Edo Dynasty (Japan)</span>
                </button>
                <button
                  onClick={() => {
                    onSelectTheme('historical-rome');
                    setHistoryDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    currentTheme === 'historical-rome' ? 'font-bold' : 'hover:bg-white/10'
                  }`}
                  style={currentTheme === 'historical-rome' ? { backgroundColor: 'var(--theme-badge-bg)', color: 'var(--theme-accent)' } : {}}
                >
                  <span>🏛️ Classical Antiquity (Rome)</span>
                </button>
                <button
                  onClick={() => {
                    onSelectTheme('historical-steampunk');
                    setHistoryDropdownOpen(false);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    currentTheme === 'historical-steampunk' ? 'font-bold' : 'hover:bg-white/10'
                  }`}
                  style={currentTheme === 'historical-steampunk' ? { backgroundColor: 'var(--theme-badge-bg)', color: 'var(--theme-accent)' } : {}}
                >
                  <span>⚙️ Victorian Steampunk</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="border-t overflow-x-auto"
        style={{
          borderColor: 'var(--theme-border)',
          backgroundColor: 'var(--theme-card)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 py-1">
          <button
            onClick={() => onSelectTab('radar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'radar'
                ? 'shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={
              activeTab === 'radar'
                ? {
                    backgroundColor: 'var(--theme-badge-bg)',
                    color: 'var(--theme-accent)',
                    border: '1px solid var(--theme-border-highlight)',
                  }
                : { color: 'var(--theme-text)' }
            }
          >
            <BarChart3 className="w-4 h-4" />
            <span>Demand Radar & Trends</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded font-bold"
              style={{ backgroundColor: 'var(--theme-accent)', color: '#ffffff' }}
            >
              100% Accurate
            </span>
          </button>

          <button
            onClick={() => onSelectTab('decider')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'decider'
                ? 'shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={
              activeTab === 'decider'
                ? {
                    backgroundColor: 'var(--theme-badge-bg)',
                    color: 'var(--theme-accent)',
                    border: '1px solid var(--theme-border-highlight)',
                  }
                : { color: 'var(--theme-text)' }
            }
          >
            <SearchCode className="w-4 h-4" />
            <span>AI Photo vs Illustration Decider</span>
            <span className="text-[10px] opacity-75">Inspector</span>
          </button>

          <button
            onClick={() => onSelectTab('seo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'seo'
                ? 'shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={
              activeTab === 'seo'
                ? {
                    backgroundColor: 'var(--theme-badge-bg)',
                    color: 'var(--theme-accent)',
                    border: '1px solid var(--theme-border-highlight)',
                  }
                : { color: 'var(--theme-text)' }
            }
          >
            <Tag className="w-4 h-4" />
            <span>StockRank™ 10-Keyword SEO</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded font-bold"
              style={{ backgroundColor: 'var(--theme-accent)', color: '#ffffff' }}
            >
              Top 10 Weighted
            </span>
          </button>

          <button
            onClick={() => onSelectTab('geo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'geo'
                ? 'shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={
              activeTab === 'geo'
                ? {
                    backgroundColor: 'var(--theme-badge-bg)',
                    color: 'var(--theme-accent)',
                    border: '1px solid var(--theme-border-highlight)',
                  }
                : { color: 'var(--theme-text)' }
            }
          >
            <Globe2 className="w-4 h-4" />
            <span>Buyer Geo & Download Tracker</span>
          </button>

          <button
            onClick={() => onSelectTab('batch')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'batch'
                ? 'shadow-sm'
                : 'opacity-70 hover:opacity-100'
            }`}
            style={
              activeTab === 'batch'
                ? {
                    backgroundColor: 'var(--theme-badge-bg)',
                    color: 'var(--theme-accent)',
                    border: '1px solid var(--theme-border-highlight)',
                  }
                : { color: 'var(--theme-text)' }
            }
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Adobe CSV Exporter</span>
            {batchCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{ backgroundColor: 'var(--theme-accent)', color: '#ffffff' }}
              >
                {batchCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
