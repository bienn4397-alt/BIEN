export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface SocialAccount {
  id: string
  userId: string
  platform: SocialPlatform
  username: string
  displayName: string
  profileImage?: string
  isConnected: boolean
  followers: number
  following: number
  accessToken?: string
  refreshToken?: string
  connectedAt: Date
}

export interface Post {
  id: string
  userId: string
  content: string
  media?: MediaFile[]
  scheduledAt?: Date
  publishedAt?: Date
  status: PostStatus
  accounts: string[]
  analytics?: PostAnalytics
  createdAt: Date
  updatedAt: Date
}

export interface MediaFile {
  id: string
  url: string
  type: 'image' | 'video' | 'gif'
  size: number
  dimensions?: {
    width: number
    height: number
  }
}

export interface PostAnalytics {
  impressions: number
  reach: number
  engagements: number
  likes: number
  comments: number
  shares: number
  clicks: number
}

export interface Campaign {
  id: string
  userId: string
  name: string
  description: string
  startDate: Date
  endDate: Date
  status: CampaignStatus
  posts: string[]
  budget: number
  spent: number
  analytics: CampaignAnalytics
  createdAt: Date
  updatedAt: Date
}

export interface CampaignAnalytics {
  reach: number
  impressions: number
  engagements: number
  conversions: number
  ctr: number
  cpm: number
  cpc: number
}

export type SocialPlatform = 
  | 'facebook' 
  | 'instagram' 
  | 'twitter' 
  | 'linkedin' 
  | 'youtube' 
  | 'tiktok'

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed'

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed'

export interface Analytics {
  date: Date
  metrics: {
    posts: number
    reach: number
    impressions: number
    engagements: number
    followers: number
  }
}

export interface DashboardStats {
  totalPosts: number
  totalFollowers: number
  totalReach: number
  totalEngagements: number
  recentPosts: number
  growthRate: number
}
