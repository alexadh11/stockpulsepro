import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Trash2,
  Plus,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  FileText,
  Layers,
} from 'lucide-react';
import { BatchItem } from '../types';

interface BatchCsvExporterProps {
  batchItems: BatchItem[];
  onRemoveItem: (id: string) => void;
  onClearBatch: () => void;
  onAddItem: (item: Omit<BatchItem, 'id'>) => void;
}

export const BatchCsvExporter: React.FC<BatchCsvExporterProps> = ({
  batchItems,
  onRemoveItem,
  onClearBatch,
  onAddItem,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFilename, setNewFilename] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newKeywords, setNewKeywords] = useState('');
  const [newCategory, setNewCategory] = useState('Technology');
  const [newAssetType, setNewAssetType] = useState('AI Photo');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Generate valid CSV compliant with Adobe Stock Contributor format
  const generateCsv = () => {
    if (batchItems.length === 0) return '';

    const headers = ['Filename', 'Title', 'Keywords', 'Category'];
    const rows = batchItems.map((item) => {
      // Escape commas and quotes for standard CSV
      const escapedFilename = `"${item.filename.replace(/"/g, '""')}"`;
      const escapedTitle = `"${item.title.replace(/"/g, '""')}"`;
      const joinedKeywords = item.keywords.join(', ');
      const escapedKeywords = `"${joinedKeywords.replace(/"/g, '""')}"`;
      const escapedCategory = `"${item.category.replace(/"/g, '""')}"`;

      return [escapedFilename, escapedTitle, escapedKeywords, escapedCategory].join(',');
    });

    return [headers.join(','), ...rows].join('\r\n');
  };

  const handleDownloadCsv = () => {
    const csvContent = generateCsv();
    if (!csvContent) {
      alert('Your batch queue is empty.');
      return;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Adobe_Stock_Metadata_Batch_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const keywordsArray = newKeywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

    onAddItem({
      filename: newFilename.trim() || `asset_${Date.now()}.jpg`,
      title: newTitle.trim(),
      keywords: keywordsArray.length > 0 ? keywordsArray : ['stock', 'commercial', 'modern'],
      category: newCategory,
      assetType: newAssetType,
      isAi: newAssetType.startsWith('AI'),
    });

    setNewFilename('');
    setNewTitle('');
    setNewKeywords('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
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
                <FileSpreadsheet className="w-3.5 h-3.5" /> Adobe Stock Contributor CSV
              </span>
              <span className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                Direct Import Compatible
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: 'var(--theme-text)' }}>
              Batch CSV Exporter for Adobe Stock Portal
            </h2>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--theme-text-muted)' }}>
              Avoid manually copy-pasting titles and tags for 50+ assets. Export an Adobe Stock-compliant CSV file (<code>Filename, Title, Keywords, Category</code>) and upload it directly into the Adobe Contributor Portal with 1 click.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all hover:bg-white/10"
              style={{
                borderColor: 'var(--theme-border)',
                color: 'var(--theme-text)',
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Asset</span>
            </button>

            <button
              onClick={handleDownloadCsv}
              disabled={batchItems.length === 0}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg flex items-center gap-2 transition-all hover:opacity-95 disabled:opacity-50"
              style={{
                backgroundColor: 'var(--theme-accent)',
                boxShadow: '0 0 16px var(--theme-accent-glow)',
              }}
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>CSV Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Adobe CSV ({batchItems.length})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Batch Assets Table */}
      <div
        className="rounded-2xl border overflow-hidden shadow-sm"
        style={{
          backgroundColor: 'var(--theme-card)',
          borderColor: 'var(--theme-border)',
        }}
      >
        <div className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: 'var(--theme-border)' }}
        >
          <div className="text-xs font-bold" style={{ color: 'var(--theme-text)' }}>
            Queued Batch Assets ({batchItems.length})
          </div>

          {batchItems.length > 0 && (
            <button
              onClick={onClearBatch}
              className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Batch</span>
            </button>
          )}
        </div>

        {batchItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className="border-b uppercase font-bold text-[10px] tracking-wider"
                style={{
                  backgroundColor: 'var(--theme-card-subtle)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text-muted)',
                }}
              >
                <tr>
                  <th className="p-3.5">Filename</th>
                  <th className="p-3.5">Optimized Title</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Keywords Preview</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--theme-border)' }}>
                {batchItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/5 transition-colors"
                    style={{ color: 'var(--theme-text)' }}
                  >
                    <td className="p-3.5 font-mono font-medium text-xs text-amber-400">
                      {item.filename}
                    </td>
                    <td className="p-3.5 font-semibold max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                        style={{
                          backgroundColor: 'var(--theme-badge-bg)',
                          color: 'var(--theme-badge-text)',
                        }}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3.5 max-w-sm">
                      <div className="truncate text-[11px] opacity-75">
                        {item.keywords.slice(0, 8).join(', ')}
                        {item.keywords.length > 8 && ` (+${item.keywords.length - 8} more)`}
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="text-[10px] opacity-80 border px-1.5 py-0.5 rounded"
                        style={{ borderColor: 'var(--theme-border)' }}
                      >
                        {item.assetType}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 rounded text-red-400 hover:bg-red-500/20 transition-colors"
                        title="Remove from batch"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <FileSpreadsheet className="w-10 h-10 mx-auto opacity-40 text-amber-500" />
            <h4 className="text-sm font-bold" style={{ color: 'var(--theme-text)' }}>
              No assets in batch queue
            </h4>
            <p className="text-xs max-w-sm mx-auto" style={{ color: 'var(--theme-text-muted)' }}>
              Add assets directly from the <strong>Demand Radar</strong> or the <strong>StockRank™ SEO Generator</strong> to build your CSV file.
            </p>
          </div>
        )}
      </div>

      {/* CSV Raw Preview Accordion */}
      {batchItems.length > 0 && (
        <div
          className="rounded-2xl p-4 border space-y-2"
          style={{
            backgroundColor: 'var(--theme-card)',
            borderColor: 'var(--theme-border)',
          }}
        >
          <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--theme-text)' }}>
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Adobe Contributor CSV Plain Text Output Preview:</span>
          </div>
          <pre
            className="p-3 rounded-xl text-[11px] font-mono overflow-x-auto border max-h-40"
            style={{
              backgroundColor: 'var(--theme-card-subtle)',
              borderColor: 'var(--theme-border)',
              color: 'var(--theme-text-muted)',
            }}
          >
            {generateCsv()}
          </pre>
        </div>
      )}

      {/* Manual Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="w-full max-w-lg rounded-2xl p-6 border shadow-2xl space-y-4"
            style={{
              backgroundColor: 'var(--theme-card)',
              borderColor: 'var(--theme-border-highlight)',
              color: 'var(--theme-text)',
            }}
          >
            <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: 'var(--theme-border)' }}>
              <h3 className="text-sm font-bold">Add Asset to Adobe CSV Batch</h3>
              <button onClick={() => setShowAddModal(false)} className="text-xs opacity-60 hover:opacity-100">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Target Filename (e.g. hydrogen_plant_01.jpg):</label>
                <input
                  type="text"
                  placeholder="photo_001.jpg"
                  value={newFilename}
                  onChange={(e) => setNewFilename(e.target.value)}
                  className="w-full p-2.5 rounded-xl border focus:outline-none"
                  style={{
                    backgroundColor: 'var(--theme-card-subtle)',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text)',
                  }}
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Adobe Optimized Title (5–8 words):</label>
                <input
                  type="text"
                  placeholder="Clean Hydrogen Electrolyzer Production Facility with Green Energy Turbines"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border focus:outline-none"
                  style={{
                    backgroundColor: 'var(--theme-card-subtle)',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text)',
                  }}
                  required
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Keywords (Comma-separated, top 10 first):</label>
                <textarea
                  rows={3}
                  placeholder="hydrogen energy, clean energy, electrolyzer, green power, sustainability..."
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                  className="w-full p-2.5 rounded-xl border focus:outline-none"
                  style={{
                    backgroundColor: 'var(--theme-card-subtle)',
                    borderColor: 'var(--theme-border)',
                    color: 'var(--theme-text)',
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold block mb-1">Category:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2 rounded-xl border focus:outline-none"
                    style={{
                      backgroundColor: 'var(--theme-card-subtle)',
                      borderColor: 'var(--theme-border)',
                      color: 'var(--theme-text)',
                    }}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Industry">Industry</option>
                    <option value="The Environment">The Environment</option>
                    <option value="People">People</option>
                    <option value="Graphic Resources">Graphic Resources</option>
                    <option value="Illustrations">Illustrations</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Asset Type:</label>
                  <select
                    value={newAssetType}
                    onChange={(e) => setNewAssetType(e.target.value)}
                    className="w-full p-2 rounded-xl border focus:outline-none"
                    style={{
                      backgroundColor: 'var(--theme-card-subtle)',
                      borderColor: 'var(--theme-border)',
                      color: 'var(--theme-text)',
                    }}
                  >
                    <option value="AI Photo">AI Photo</option>
                    <option value="AI Illustration">AI Illustration</option>
                    <option value="Vector">Vector</option>
                    <option value="Authentic Photo">Authentic Photo</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t" style={{ borderColor: 'var(--theme-border)' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border opacity-70 hover:opacity-100"
                  style={{ borderColor: 'var(--theme-border)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-white font-semibold"
                  style={{ backgroundColor: 'var(--theme-accent)' }}
                >
                  Add to Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
