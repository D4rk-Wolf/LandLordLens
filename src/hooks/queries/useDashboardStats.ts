import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../utils/api-client';
import { DashboardStats } from '../../types/models';
import { useAuth } from '../../contexts/AuthContext';

export const useDashboardStats = () => {
  const { isAuthenticated, token } = useAuth();

  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: () => apiClient.get<DashboardStats>('/analytics/dashboard-stats', token || undefined),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
