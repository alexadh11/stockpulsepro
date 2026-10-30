import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Tag,
  Copy,
  Check,
  ArrowUp,
  ArrowDown,
  X,
  Plus,
  TrendingUp,
  FileSpreadsheet,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Info,
  HelpCircle,
} from 'lucide-react';
import { KeywordGenerationResult } from '../types';

interface KeywordGeneratorProps {
  initialPrompt?: string;
  initialAssetType?: string;
  initialStyle?: string;
  onAddToBatch: (item: {
    title: string;
    keywords: string[];
    category: string;
    assetType: string;
    isAi: boolean;
  }) => void;
}

export const KeywordGenerator: React.FC<KeywordGeneratorProps> = ({
  initialPrompt = '',
  initialAssetType = 'AI Photo',
  initialStyle = 'Commercial',
  onAddToBatch,
}) => {
  const [description, setDescription] = useState(initialPrompt || 'Modern Clean Hydrogen Electrolyzer Production Facility');
  const [assetType, setAssetType] = useState(initialAssetType);
  const [visualStyle, setVisualStyle] = useState(initialStyle);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedTop10, setCopiedTop10] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [addedBatch, setAddedBatch] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  // Editable result state
  const [title, setTitle] = useState('Clean Hydrogen Electrolyzer Production Facility with Green Energy Turbines');
  const [top10, setTop10] = useState<string[]>([
    'hydrogen energy',
    'green hydrogen',
    'electrolyzer',
    'clean energy',
    'renewable energy',
    'industrial plant',
    'sustainability',
    'net zero',
    'carbon neutral',
    'energy transition',
  ]);
  const [secondaryTags, setSecondaryTags] = useState<string[]>([
    'power generation',
    'factory',
    'fuel cell',
    'technology',
    'innovation',
    'future',
    'alternative energy',
    'ecology',
    'electricity',
    'piping',
    'steel',
    'environmental',
    'modern',
    'machinery',
    'equipment',
    'commercial',
    'copy space',
    'horizontal',
  ]);
  const [category, setCategory] = useState('Industry');
  const [opportunityScore, setOpportunityScore] = useState(96);
  const [searchVolume, setSearchVolume] = useState('Very High (62k/mo)');
  const [competition, setCompetition] = useState('Low-Medium');
  const [bestGeo, setBestGeo] = useState('Germany (38%), USA (32%), Japan (14%)');

  useEffect(() => {
    if (initialPrompt && initialPrompt !== description) {
      setDescription(initialPrompt);
      if (initialAssetType) setAssetType(initialAssetType);
      if (initialStyle) setVisualStyle(initialStyle);
      handleGenerate(initialPrompt, initialAssetType || assetType);
    }
  }, [initialPrompt, initialAssetType, initialStyle]);

  const handleGenerate = async (queryText?: string, targetType?: string) => {
    const textToUse = queryText || description;
    if (!textToUse.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: textToUse,
          subject: textToUse,
          assetType: targetType || assetType,
          style: visualStyle,
        }),
      });

      const resData = await response.json();
      if (resData.success && resData.data) {
        const data = resData.data;
        if (data.optimizedTitle) setTitle(data.optimizedTitle);
        if (data.top10Keywords) setTop10(data.top10Keywords.slice(0, 10));
        if (data.secondaryKeywords) setSecondaryTags(data.secondaryKeywords);
        if (data.category) setCategory(data.category);
        if (data.opportunityScore) setOpportunityScore(data.opportunityScore);
        if (data.buyerSearchVolume) setSearchVolume(data.buyerSearchVolume);
        if (data.competitionIndex) setCompetition(data.competitionIndex);
        if (data.bestBuyerGeo) setBestGeo(data.bestBuyerGeo);
      }
    } catch (err) {
      console.error('Keyword generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Reorder Top 10 Keywords (Priority Shift)
  const moveKeyword = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= top10.length) return;

    const updated = [...top10];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setTop10(updated);
  };

  const removeTopKeyword = (index: number) => {
    const item = top10[index];
    setTop10(top10.filter((_, i) => i !== index));
    setSecondaryTags([item, ...secondaryTags]);
  };

  const promoteSecondaryToTop10 = (index: number) => {
    const item = secondaryTags[index];
    setSecondaryTags(secondaryTags.filter((_, i) => i !== index));
    if (top10.length < 10) {
      setTop10([...top10, item]);
    } else {
      // Swap out the 10th item into secondary
      const demoted = top10[9];
      setTop10([...top10.slice(0, 9), item]);
      setSecondaryTags([demoted, ...secondaryTags.filter((_, i) => i !== index)]);
    }
  };

  const removeSecondaryTag = (index: number) => {
    setSecondaryTags(secondaryTags.filter((_, i) => i !== index));
  };

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    const clean = newTagInput.trim().toLowerCase();
    if (top10.length < 10) {
      setTop10([...top10, clean]);
    } else {
      setSecondaryTags([clean, ...secondaryTags]);
    }
    setNewTagInput('');
  };

  const allKeywords = [...top10, ...secondaryTags];
  const commaSeparatedKeywords = allKeywords.join(', ');

  const handleCopyTitle = () => {
    navigator.clipboard.writeText(title);
    setCopiedTitle(true);
    setTimeout(() => setCopiedTitle(false), 2000);
  };

  const handleCopyTop10 = () => {
    navigator.clipboard.writeText(top10.join(', '));
    setCopiedTop10(true);
    setTimeout(() => setCopiedTop10(false), 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(commaSeparatedKeywords);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleAddToBatch = () => {
    onAddToBatch({
      title,
      keywords: allKeywords,
      category,
      assetType,
      isAi: assetType.startsWith('AI'),
    });
    setAddedBatch(true);
    setTimeout(() => setAddedBatch(false), 2500);
  };

  const titleWordCount = title.trim().split(/\s+/).filter(Boolean).length;
  const isTitleOptimal = titleWordCount >= 5 && titleWordCount <= 8;

  return (
    <div className="space-y-6">
      {/* Overview & Adobe Algorithm Weights */}
      <div
        className="rounded-2xl p-5 border shadow-sm"
        style={{
          backgroundColor: 'var(--theme-card)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span
                className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"
                style={{
                  backgroundColor: 'var(--theme-badge-bg)',
                  color: 'var(--theme-badge-text)',
                }}
              >
                <Sparkles className="w-3.5 h-3.5" /> StockRank™ Algorithm Calibrated
              </span>
              <span className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                Adobe Stock 80/20 Rule Applied
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: 'var(--theme-text)' }}>
              Adobe Stock SEO & Keyword Ranking Generator
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--theme-text-muted)' }}>
              Adobe Stock ranks search results based on the <strong>Title and the first 10 keywords (weighted ~80%)</strong>. Our engine automatically structures your metadata so buyers find your assets on page 1.
            </p>
          </div>

          <div
            className="p-3.5 rounded-xl border text-xs space-y-1.5"
            style={{
              backgroundColor: 'var(--theme-card-subtle)',
              borderColor: 'var(--theme-border-highlight)',
              color: 'var(--theme-text)',
            }}
          >
            <div className="font-bold flex items-center gap-1.5 text-amber-500">
              <Info className="w-4 h-4" />
              <span>Adobe Keyword Positioning Rules</span>
            </div>
            <div className="text-[11px] opacity-80">
              1. <strong>Slots 1–3:</strong> Core Subject / Primary Focus
            </div>
            <div className="text-[11px] opacity-80">
              2. <strong>Slots 4–6:</strong> Action, Scene Setting, Environment
            </div>
            <div className="text-[11px] opacity-80">
              3. <strong>Slots 7–10:</strong> Commercial Intent & Industry Utility
            </div>
          </div>
        </div>
      </div>

      {/* Generator Input Section */}
      <div
        className="rounded-2xl p-5 border space-y-4 shadow-sm"
        style={{
          backgroundColor: 'var(--theme-card)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-6">
            <label className="text-xs font-bold block mb-1" style={{ color: 'var(--theme-text)' }}>
              Subject / Concept to Optimize:
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Modern Clean Hydrogen Electrolyzer Production Facility"
              className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none"
              style={{
                backgroundColor: 'var(--theme-card-subtle)',
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text)',
              }}
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-xs font-bold block mb-1" style={{ color: 'var(--theme-text)' }}>
              Asset Type:
            </label>
            <select
              value={assetType}
              onChange={(e) => setAssetType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm border focus:outline-none"
              style={{
                backgroundColor: 'var(--theme-card-subtle)',
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text)',
              }}
            >
              <option value="AI Photo">AI Photo (Photorealistic)</option>
              <option value="AI Illustration">AI Illustration (Digital Art)</option>
              <option value="Vector">Vector Graphic / Icon</option>
              <option value="Authentic Photo">Authentic Camera Photo (No AI)</option>
              <option value="3D">3D Render</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating}
              className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white shadow-md flex items-center justify-center gap-1.5 transition-all hover:opacity-95 disabled:opacity-50"
              style={{
                backgroundColor: 'var(--theme-accent)',
                boxShadow: '0 0 12px var(--theme-accent-glow)',
              }}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Optimizing Metadata...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate StockRank™ Metadata</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Metrics Ticker */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t text-xs"
          style={{ borderColor: 'var(--theme-border)' }}
        >
          <div className="p-2.5 rounded-lg border bg-black/10" style={{ borderColor: 'var(--theme-border)' }}>
            <div className="text-[10px] uppercase font-semibold opacity-60">Estimated Search Volume</div>
            <div className="text-xs font-bold text-emerald-400 mt-0.5">{searchVolume}</div>
          </div>

          <div className="p-2.5 rounded-lg border bg-black/10" style={{ borderColor: 'var(--theme-border)' }}>
            <div className="text-[10px] uppercase font-semibold opacity-60">Competition Index</div>
            <div className="text-xs font-bold text-amber-400 mt-0.5">{competition}</div>
          </div>

          <div className="p-2.5 rounded-lg border bg-black/10" style={{ borderColor: 'var(--theme-border)' }}>
            <div className="text-[10px] uppercase font-semibold opacity-60">Top Demand Geo</div>
            <div className="text-xs font-bold truncate mt-0.5" style={{ color: 'var(--theme-text)' }}>
              {bestGeo}
            </div>
          </div>

          <div className="p-2.5 rounded-lg border bg-black/10" style={{ borderColor: 'var(--theme-border)' }}>
            <div className="text-[10px] uppercase font-semibold opacity-60">Opportunity Index</div>
            <div className="text-xs font-black mt-0.5" style={{ color: 'var(--theme-accent)' }}>
              {opportunityScore} / 100
            </div>
          </div>
        </div>
      </div>

      {/* Main Results Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Title & Top 10 Priority Reorder Panel */}
        <div className="lg:col-span-7 space-y-4">
          {/* Title Editor Card */}
          <div
            className="rounded-2xl p-5 border space-y-3"
            style={{
              backgroundColor: 'var(--theme-card)',
              borderColor: 'var(--theme-border)',
            }}
          >
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--theme-text)' }}>
                <span>Adobe Optimized Title</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isTitleOptimal
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-amber-500/20 text-amber-400'
                  }`}
                >
                  {titleWordCount} words ({isTitleOptimal ? 'Ideal 5–8 words' : 'Recommended 5–8 words'})
                </span>
              </label>

              <button
                onClick={handleCopyTitle}
                className="text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
                style={{ color: 'var(--theme-accent)' }}
              >
                {copiedTitle ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTitle ? 'Copied!' : 'Copy Title'}</span>
              </button>
            </div>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl text-xs sm:text-sm font-medium border focus:outline-none"
              style={{
                backgroundColor: 'var(--theme-card-subtle)',
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text)',
              }}
            />
            <p className="text-[11px]" style={{ color: 'var(--theme-text-muted)' }}>
              💡 Adobe Stock prefers concise, commercial titles. Avoid keyword-stuffing like "Solar solar energy clean clean sun".
            </p>
          </div>

          {/* Priority Top 10 Keywords (Reorderable) */}
          <div
            className="rounded-2xl p-5 border space-y-4"
            style={{
              backgroundColor: 'var(--theme-card)',
              borderColor: 'var(--theme-border-highlight)',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold" style={{ color: 'var(--theme-text)' }}>
                    Top 10 Priority Keywords (80% Algorithm Weight)
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: 'var(--theme-accent)', color: '#ffffff' }}
                  >
                    Rank 1 to 10
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                  Use arrows to reorder keywords so your most critical terms sit in positions 1–5.
                </p>
              </div>

              <button
                onClick={handleCopyTop10}
                className="text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity"
                style={{ color: 'var(--theme-accent)' }}
              >
                {copiedTop10 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTop10 ? 'Copied Top 10' : 'Copy Top 10'}</span>
              </button>
            </div>

            {/* List of top 10 keywords */}
            <div className="space-y-1.5">
              {top10.map((tag, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3 py-2 rounded-xl border text-xs transition-all hover:border-purple-400 group"
                  style={{
                    backgroundColor: 'var(--theme-card-subtle)',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px]"
                      style={{
                        backgroundColor: idx < 3 ? 'var(--theme-accent)' : 'var(--theme-badge-bg)',
                        color: idx < 3 ? '#ffffff' : 'var(--theme-badge-text)',
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-semibold">{tag}</span>
                    {idx < 3 && (
                      <span className="text-[10px] opacity-60 font-medium">
                        (Primary Subject)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveKeyword(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded hover:bg-white/10 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveKeyword(idx, 'down')}
                      disabled={idx === top10.length - 1}
                      className="p-1 rounded hover:bg-white/10 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeTopKeyword(idx)}
                      className="p-1 rounded hover:bg-red-500/20 text-red-400 ml-1"
                      title="Move to Secondary"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary Keywords (11-35) & Actions */}
        <div className="lg:col-span-5 space-y-4">
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
                  Secondary Keywords ({secondaryTags.length})
                </h3>
                <p className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                  Positions 11 to 35. Click tag to promote to Top 10.
                </p>
              </div>

              <span className="text-xs font-semibold" style={{ color: 'var(--theme-text-muted)' }}>
                Total: <strong style={{ color: 'var(--theme-text)' }}>{allKeywords.length}</strong> / 49
              </span>
            </div>

            {/* Add Custom Tag Form */}
            <form onSubmit={handleAddCustomTag} className="flex gap-2">
              <input
                type="text"
                placeholder="Add custom keyword..."
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg text-xs border focus:outline-none"
                style={{
                  backgroundColor: 'var(--theme-card-subtle)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text)',
                }}
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1 hover:bg-white/10"
                style={{
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text)',
                }}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>

            {/* Secondary Tags Cloud */}
            <div className="flex flex-wrap gap-1.5 max-h-64 overflow-y-auto p-1">
              {secondaryTags.map((tag, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1.5 group cursor-pointer transition-all hover:border-purple-400"
                  style={{
                    backgroundColor: 'var(--theme-card-subtle)',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text)',
                  }}
                  title="Click to promote to Top 10"
                  onClick={() => promoteSecondaryToTop10(idx)}
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSecondaryTag(idx);
                    }}
                    className="opacity-40 hover:opacity-100 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Export & Copy Buttons */}
            <div className="space-y-2 pt-3 border-t" style={{ borderColor: 'var(--theme-border)' }}>
              <button
                onClick={handleCopyAll}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 hover:bg-white/10"
                style={{
                  borderColor: 'var(--theme-border)',
                  color: copiedAll ? '#10b981' : 'var(--theme-text)',
                }}
              >
                {copiedAll ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>
                  {copiedAll
                    ? 'Copied All (Comma-Separated)!'
                    : 'Copy All Keywords (Adobe Stock Format)'}
                </span>
              </button>

              <button
                onClick={handleAddToBatch}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow-md flex items-center justify-center gap-2 transition-all hover:opacity-95"
                style={{
                  backgroundColor: 'var(--theme-accent)',
                  boxShadow: '0 0 12px var(--theme-accent-glow)',
                }}
              >
                {addedBatch ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Added to Adobe CSV Batch!</span>
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Add to Adobe Stock CSV Batch</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
