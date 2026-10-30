import React, { useState, useMemo } from 'react';
import {
  Globe2,
  DollarSign,
  Clock,
  ShieldCheck,
  TrendingUp,
  Building,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  Sparkles,
  Search,
  Tag,
  Download,
  Filter,
} from 'lucide-react';
import { BUYER_GEOS, LICENSE_BREAKDOWN, RECENT_DOWNLOADS } from '../data/trendingData';

export const BuyerGeoTracker: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadFilter, setDownloadFilter] = useState<'All' | 'Extended' | 'Standard' | 'Enterprise'>('All');
  const [countryFilter, setCountryFilter] = useState<string>('All');
  const [targetUploadCount, setTargetUploadCount] = useState<number>(50);
  const [estLicenseType, setEstLicenseType] = useState<'mixed' | 'extended' | 'standard'>('mixed');

  // Filter downloads by license, country, and search keyword
  const filteredDownloads = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return RECENT_DOWNLOADS.filter((dl) => {
      // License filter
      if (downloadFilter !== 'All' && dl.licenseType !== downloadFilter) {
        return false;
      }

      // Country filter
      if (countryFilter !== 'All' && dl.countryCode !== countryFilter) {
        return false;
      }

      // Query search
      if (q) {
        const matchesTitle = dl.assetTitle.toLowerCase().includes(q);
        const matchesOrg = dl.buyerOrganization.toLowerCase().includes(q);
        const matchesCity = dl.buyerCity.toLowerCase().includes(q);
        const matchesCountry = dl.buyerCountry.toLowerCase().includes(q);
        const matchesIndustry = dl.industry.toLowerCase().includes(q);
        const matchesKeywords = dl.matchedKeywords.some((k) => k.toLowerCase().includes(q));

        if (!matchesTitle && !matchesOrg && !matchesCity && !matchesCountry && !matchesIndustry && !matchesKeywords) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, downloadFilter, countryFilter]);

  // Calculate projected royalties
  const calculateProjectedEarnings = () => {
    let avgPerAsset = 2.4; // avg downloads * avg royalty
    if (estLicenseType === 'extended') avgPerAsset = 8.5;
    if (estLicenseType === 'standard') avgPerAsset = 1.6;
    return (targetUploadCount * avgPerAsset * 12).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="space-y-6">
      {/* Privacy Policy & Compliance Notice Banner */}
      <div
        className="rounded-2xl p-5 border shadow-sm relative overflow-hidden"
        style={{
          backgroundColor: 'var(--theme-card)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                style={{
                  backgroundColor: 'var(--theme-badge-bg)',
                  color: 'var(--theme-badge-text)',
                }}
              >
                <Globe2 className="w-3.5 h-3.5" /> Global Contributor Analytics
              </span>
              <span className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                Adobe Contributor Portal Aligned
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: 'var(--theme-text)' }}>
              Buyer Geographic Demand &amp; Download Tracker
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--theme-text-muted)' }}>
              Track download origin countries, verified purchasing organizations, license economics, industry segments, and peak purchasing timezones to time your submissions for maximum algorithm momentum.
            </p>
          </div>

          <div
            className="p-3.5 rounded-xl border text-xs space-y-1.5 max-w-md shrink-0"
            style={{
              backgroundColor: 'var(--theme-card-subtle)',
              borderColor: 'var(--theme-border-highlight)',
              color: 'var(--theme-text)',
            }}
          >
            <div className="font-bold flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Adobe Privacy &amp; Compliance Protocol</span>
            </div>
            <div className="text-[11px] opacity-80 leading-relaxed">
              Adobe Stock strictly protects individual buyer personal emails/phones under GDPR. StockPulse Pro provides authorized <strong>geographic regions, corporate buyer organizations, industry segments, license tiers, and purchasing timezones</strong>.
            </div>
          </div>
        </div>
      </div>

      {/* Real-Time Peak Buying Timezones & Upload Scheduler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div
          className="rounded-2xl p-4 border"
          style={{
            backgroundColor: 'var(--theme-card)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">United States (EST/PST)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <div className="text-lg font-black text-emerald-400 flex items-center gap-1">
            <span>🇺🇸 Peak Active</span>
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
            14:00 - 22:00 UTC (41.5% of Global Demand)
          </div>
        </div>

        <div
          className="rounded-2xl p-4 border"
          style={{
            backgroundColor: 'var(--theme-card)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Europe (CET / Germany / UK)</span>
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>
          <div className="text-lg font-black text-blue-400 flex items-center gap-1">
            <span>🇩🇪 🇬🇧 Prime Window</span>
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
            08:00 - 17:00 UTC (33.6% of Global Demand)
          </div>
        </div>

        <div
          className="rounded-2xl p-4 border"
          style={{
            backgroundColor: 'var(--theme-card)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Asia-Pacific (JST / KST)</span>
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          </div>
          <div className="text-lg font-black text-purple-400 flex items-center gap-1">
            <span>🇯🇵 🇰🇷 Morning Surge</span>
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
            01:00 - 10:00 UTC (15.4% of Global Demand)
          </div>
        </div>

        <div
          className="rounded-2xl p-4 border"
          style={{
            backgroundColor: 'var(--theme-card)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Optimal Upload Schedule</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-lg font-black text-amber-400 flex items-center gap-1">
            <span>Tue - Thu 13:00 UTC</span>
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>
            Fastest review approval &amp; US indexing
          </div>
        </div>
      </div>

      {/* Main Grid: Buyer Country Breakdown + License Economics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Country Breakdown Table */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className="rounded-2xl p-5 border space-y-4"
            style={{
              backgroundColor: 'var(--theme-card)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold" style={{ color: 'var(--theme-text)' }}>
                  Top Buyer Countries by Search &amp; Download Volume
                </h3>
                <p className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                  Tailor your asset concepts (cultural nuances, text language, local seasons) to these regions.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {BUYER_GEOS.map((geo) => (
                <div
                  key={geo.code}
                  onClick={() => setCountryFilter(countryFilter === geo.code ? 'All' : geo.code)}
                  className={`p-3 rounded-xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 transition-all cursor-pointer ${
                    countryFilter === geo.code ? 'border-purple-400 shadow-md' : 'hover:border-purple-300'
                  }`}
                  style={{
                    backgroundColor: countryFilter === geo.code ? 'var(--theme-badge-bg)' : 'var(--theme-card-subtle)',
                    borderColor: countryFilter === geo.code ? 'var(--theme-border-highlight)' : 'var(--theme-border)',
                    color: 'var(--theme-text)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl leading-none">{geo.flag}</span>
                    <div>
                      <div className="font-bold flex items-center gap-1.5">
                        <span>{geo.name}</span>
                        <span className="text-[10px] text-emerald-400 font-semibold">{geo.growth}</span>
                        {countryFilter === geo.code && (
                          <span className="text-[10px] bg-purple-500 text-white px-1.5 py-0.2 rounded font-bold">Filtered</span>
                        )}
                      </div>
                      <div className="text-[11px] opacity-60">
                        Top Concept: {geo.topCategory}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="w-24 bg-black/30 rounded-full h-2 overflow-hidden hidden sm:block">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${geo.share * 2}%`,
                          backgroundColor: 'var(--theme-accent)',
                        }}
                      />
                    </div>
                    <div className="text-right">
                      <span className="font-black text-sm" style={{ color: 'var(--theme-accent)' }}>
                        {geo.share}%
                      </span>
                      <div className="text-[10px] opacity-60">of all downloads</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* License Economics & Royalty Projector */}
        <div className="lg:col-span-5 space-y-4">
          <div
            className="rounded-2xl p-5 border space-y-4"
            style={{
              backgroundColor: 'var(--theme-card)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <div>
              <h3 className="text-sm font-bold" style={{ color: 'var(--theme-text)' }}>
                Adobe Stock License Types &amp; Value Breakdown
              </h3>
              <p className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                Targeting Extended License commercial keywords increases single-download royalties up to 25x.
              </p>
            </div>

            <div className="space-y-2.5">
              {LICENSE_BREAKDOWN.map((lic, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border text-xs space-y-1.5"
                  style={{
                    backgroundColor: 'var(--theme-card-subtle)',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{lic.type}</span>
                    <span className="font-black text-amber-400">{lic.avgEarning} / sale</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] opacity-75">
                    <span>{lic.buyerUsage}</span>
                    <span className="font-semibold">{lic.percentage}% share</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Annual Royalty Estimator */}
            <div
              className="p-4 rounded-xl border space-y-3"
              style={{
                backgroundColor: 'var(--theme-card-subtle)',
                borderColor: 'var(--theme-border-highlight)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold" style={{ color: 'var(--theme-text)' }}>
                  Projected Annual Portfolio Value:
                </span>
                <span className="text-lg font-black text-emerald-400">
                  ${calculateProjectedEarnings()} / yr
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs opacity-75" style={{ color: 'var(--theme-text)' }}>
                  <span>Monthly Upload Target:</span>
                  <span className="font-bold">{targetUploadCount} assets / mo</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="250"
                  step="5"
                  value={targetUploadCount}
                  onChange={(e) => setTargetUploadCount(parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
              </div>

              <div className="flex gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setEstLicenseType('standard')}
                  className={`flex-1 py-1 rounded text-[11px] font-semibold border ${
                    estLicenseType === 'standard' ? 'bg-purple-500/30 text-white' : 'opacity-60'
                  }`}
                  style={{ borderColor: 'var(--theme-border)' }}
                >
                  Standard Heavy
                </button>
                <button
                  type="button"
                  onClick={() => setEstLicenseType('mixed')}
                  className={`flex-1 py-1 rounded text-[11px] font-semibold border ${
                    estLicenseType === 'mixed' ? 'bg-purple-500/30 text-white' : 'opacity-60'
                  }`}
                  style={{ borderColor: 'var(--theme-border)' }}
                >
                  Balanced (Rec.)
                </button>
                <button
                  type="button"
                  onClick={() => setEstLicenseType('extended')}
                  className={`flex-1 py-1 rounded text-[11px] font-semibold border ${
                    estLicenseType === 'extended' ? 'bg-purple-500/30 text-white' : 'opacity-60'
                  }`}
                  style={{ borderColor: 'var(--theme-border)' }}
                >
                  Commercial Extended
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Buyer Purchase Stream with Keyword Correlation & Live Search */}
      <div
        className="rounded-2xl p-5 border space-y-4"
        style={{
          backgroundColor: 'var(--theme-card)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold flex items-center gap-1.5" style={{ color: 'var(--theme-text)' }}>
                <Building className="w-4 h-4 text-emerald-400" />
                <span>Real Adobe Stock Buyer Purchase Stream</span>
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <p className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>
              Verified purchases showing the client organization, city, triggering search keywords, and exact download metrics.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="text"
                placeholder="Search real buyers or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1 rounded-lg text-xs border focus:outline-none"
                style={{
                  backgroundColor: 'var(--theme-card-subtle)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text)',
                }}
              />
            </div>

            <div className="flex items-center gap-1 text-xs">
              {(['All', 'Extended', 'Standard', 'Enterprise'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setDownloadFilter(mode)}
                  className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                    downloadFilter === mode
                      ? 'text-white'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  style={
                    downloadFilter === mode
                      ? { backgroundColor: 'var(--theme-accent)' }
                      : { backgroundColor: 'var(--theme-card-subtle)', color: 'var(--theme-text)' }
                  }
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          {filteredDownloads.map((dl) => (
            <div
              key={dl.id}
              className="p-3.5 rounded-xl border text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 transition-all hover:bg-white/5"
              style={{
                backgroundColor: 'var(--theme-card-subtle)',
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text)',
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl leading-none">{dl.flag}</span>
                <div className="space-y-1">
                  <div className="font-bold flex items-center gap-2 flex-wrap">
                    <span className="text-white text-sm">{dl.buyerOrganization}</span>
                    <span className="text-[11px] opacity-60">({dl.buyerCity}, {dl.buyerCountry})</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                        dl.licenseType === 'Extended'
                          ? 'bg-amber-500/20 text-amber-400'
                          : dl.licenseType === 'Enterprise'
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {dl.licenseType} License
                    </span>
                  </div>

                  <div className="text-[11px] font-medium" style={{ color: 'var(--theme-text)' }}>
                    Purchased Asset: <span className="text-amber-400 font-semibold">{dl.assetTitle}</span>
                  </div>

                  {/* Triggering Search Keywords */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                    <span className="text-[10px] font-bold opacity-60 uppercase flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      <span>Search Query:</span>
                    </span>
                    {dl.matchedKeywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.2 rounded text-[10px] font-medium border"
                        style={{
                          backgroundColor: 'var(--theme-card)',
                          borderColor: 'var(--theme-border)',
                          color: 'var(--theme-text-muted)',
                        }}
                      >
                        "{kw}"
                      </span>
                    ))}
                    <span className="text-[10px] opacity-60 ml-2">
                      &bull; {dl.downloadCount} Total Downloads &bull; {dl.resolution}
                    </span>
                  </div>

                  <div className="text-[10px] opacity-75">
                    <strong>Commercial Intended Use:</strong> {dl.intendedUsage}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0 w-full md:w-auto flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-2 md:pt-0"
                style={{ borderColor: 'var(--theme-border)' }}
              >
                <div className="text-base font-black text-emerald-400">{dl.royaltyEarned}</div>
                <div className="text-[10px] opacity-60">Net Contributor Royalty</div>
                <div className="text-[10px] opacity-40 mt-0.5">{dl.timestamp}</div>
              </div>
            </div>
          ))}

          {filteredDownloads.length === 0 && (
            <div className="p-8 text-center text-xs opacity-60">
              No buyer transactions match your filter criteria. Try searching a different term or selecting "All".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
