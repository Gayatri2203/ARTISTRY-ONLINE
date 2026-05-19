export interface Artwork {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  price?: number;
  imageUrl: string;
  artistId: string;
  artistName?: string;
  artistAvatar?: string;
  likes: number;
  views: number;
  createdAt: string;
}

export interface DashboardStats {
  totalArtworks: number;
  totalLikes: number;
  totalViews: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: string;
  message: string;
  createdAt: string;
}
