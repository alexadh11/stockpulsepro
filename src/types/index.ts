export type ThemeMode =
  | 'angel'
  | 'black-hole'
  | 'dragon-fire'
  | 'dragon-frost'
  | 'dragon-void'
  | 'dragon-storm'
  | 'historical-parchment'
  | 'historical-edo'
  | 'historical-rome'
  | 'historical-steampunk';

export type MainThemeCategory = 'angel' | 'black-hole' | 'dragon' | 'historical';

export type AssetType = 'All' | 'Photo' | 'Illustration' | 'Vector' | '3D' | 'Video';

export type AiFilterMode = 'all' | 'ai_only' | 'no_ai';

export interface BuyerPurchaseRecord {
  id: string;
  buyerOrganization: string;
  buyerCity: string;
  buyerCountry: string;
  countryCode: string;
  flag: string;
  industry: string;
  licenseType: 'Standard' | 'Extended' | 'Enterprise';
  royaltyEarned: string;
  timestamp: string;
  matchedSearchKeywords: string[];
  intendedUsage: string;
  downloadResolution: string;
}

export interface TrendingNiche {
  id: string;
  keyword: string;
  titleSuggestion: string;
  category: string;
  assetType: 'Photo' | 'Illustration' | 'Vector' | '3D' | 'Video';
  aiStatus: 'AI Allowed' | 'AI Only' | 'Exclude AI (Authentic)';
  searchVelocity: string; // e.g. "+340%"
  availableCount: number;
  totalMonthlyDownloads: number;
  opportunityScore: number; // 1 - 100
  buyerDemandRating: 'Extremely High' | 'High' | 'Rising Rapidly' | 'Emerging Niche';
  topBuyerCountry: string;
  topBuyerCountryCode: string;
  avgRoyaltyRange: string;
  seasonTag?: string;
  recommendedKeywords: string[];
  recentBuyers: BuyerPurchaseRecord[];
}

export interface AssetAnalysisResult {
  verdict: 'AI Photo' | 'AI Illustration' | 'Authentic Photo' | 'Vector Graphic';
  confidenceScore: number;
  opticalRealismScore: number;
  stylizationScore: number;
  grainAndTextureAnalysis: string;
  edgeAndLightingAnalysis: string;
  adobeStockSubmissionCategory: 'Photos' | 'Illustrations' | 'Vectors';
  adobeAIToggleSetting: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  keyReasons: string[];
  contributorAdvice: string;
}

export interface KeywordGenerationResult {
  optimizedTitle: string;
  top10Keywords: string[];
  secondaryKeywords: string[];
  category: string;
  opportunityScore: number;
  buyerSearchVolume: string;
  competitionIndex: string;
  bestBuyerGeo: string;
  targetIndustry: string;
  recommendedLicense: string;
}

export interface BuyerGeoItem {
  code: string;
  name: string;
  share: number;
  growth: string;
  peakTimezone: string;
  topCategory: string;
  flag: string;
}

export interface LicenseItem {
  type: string;
  percentage: number;
  avgEarning: string;
  buyerUsage: string;
}

export interface DownloadEvent {
  id: string;
  timestamp: string;
  assetTitle: string;
  assetType: 'AI Photo' | 'AI Illustration' | 'Authentic Photo' | 'Vector' | '3D' | 'Video';
  category: string;
  aiStatus: 'AI' | 'Non-AI';
  buyerCountry: string;
  countryCode: string;
  flag: string;
  buyerOrganization: string;
  buyerCity: string;
  licenseType: 'Standard' | 'Extended' | 'Enterprise';
  royaltyEarned: string;
  industry: string;
  matchedKeywords: string[];
  downloadCount: number;
  intendedUsage: string;
  resolution: string;
}

export interface BatchItem {
  id: string;
  filename: string;
  title: string;
  keywords: string[];
  category: string;
  assetType: string;
  isAi: boolean;
  thumbnailUrl?: string;
}
