import { QueryKey } from 'src/constants/query-key';
import { VechiclesListParams, VechiclesListResponse } from './types';
import { api } from 'src/boot/axios';
import { ApiRoute } from 'src/constants/api-route';
import { useQuery } from '@tanstack/vue-query';
import { MaybeRef } from 'vue';
import { ListPlaceholder } from './placeholder/list-placeholder';

export const useVehiclesList = (params: MaybeRef<VechiclesListParams>) =>
    useQuery<VechiclesListResponse>({
        queryKey: [QueryKey.List, params],
        queryFn: () => api.post(ApiRoute.List, params),
        placeholderData: (previousData) => previousData ?? ListPlaceholder,
        staleTime: Infinity,
    });
