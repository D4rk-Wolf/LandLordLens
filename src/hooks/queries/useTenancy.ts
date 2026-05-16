import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../utils/api-client';
import { TenancyDetailResponse } from '../../types/models';
import { useAuth } from '../../contexts/AuthContext';

export const useTenancy = (id: string | undefined) => {
    const { isAuthenticated, token } = useAuth();

    return useQuery({
        queryKey: ['tenancy', id],
        queryFn: () => apiClient.get<TenancyDetailResponse>(`/tenancies/${id}`, token || undefined),
        enabled: isAuthenticated && !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
