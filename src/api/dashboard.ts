import apiClient from '@/lib/api-client';

export interface PlatformStat {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
}

export interface Company {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface SystemAlert {
  id: number;
  type: string;
  message: string;
  timestamp: string;
}

export const dashboardApi = {
  getPlatformStats: async (): Promise<PlatformStat[]> => {
    const { data } = await apiClient.get('/api/dashboard/stats');
    return data;
  },

  getCompanies: async (): Promise<Company[]> => {
    const { data } = await apiClient.get('/api/dashboard/companies');
    return data;
  },

  getSystemAlerts: async (): Promise<SystemAlert[]> => {
    const { data } = await apiClient.get('/api/dashboard/alerts');
    return data;
  },
};

export default dashboardApi;
