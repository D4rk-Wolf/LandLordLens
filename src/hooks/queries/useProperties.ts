import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../utils/api-client';
import { Property } from '../../types/models';
import { useAuth } from '../../contexts/AuthContext';

export const useProperties = () => {
    const { isAuthenticated } = useAuth();

    return useQuery({
        queryKey: ['properties'],
        queryFn: async () => {
            const data = await apiClient.get<{ properties: Property[] }>('/properties');
            return data.properties;
        },
        enabled: isAuthenticated,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
