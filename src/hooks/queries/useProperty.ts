import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../utils/api-client';
import { PropertyDetailResponse } from '../../types/models';
import { useAuth } from '../../contexts/AuthContext';

export const useProperty = (id: string | undefined) => {
    const { isAuthenticated, token } = useAuth();

    return useQuery({
        queryKey: ['property', id],
        queryFn: () => apiClient.get<PropertyDetailResponse>(`/properties/${id}`, token || undefined),
        enabled: isAuthenticated && !!id,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
