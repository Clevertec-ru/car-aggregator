import { QueryKey } from 'src/constants/query-key';
import { VechiclesListParams, VechiclesListResponse } from './types';
import { api } from 'src/boot/axios';
import { ApiRoute } from 'src/constants/api-route';
import { useQuery } from '@tanstack/vue-query';
import { parseToQueryString } from 'src/utils/parse-to-query-string';
import { MaybeRef, unref } from 'vue';
import { ListPlaceholder } from './placeholder/list-placeholder';

export const useVehiclesList = (params: MaybeRef<VechiclesListParams>) =>
    useQuery<VechiclesListResponse>({
        queryKey: [QueryKey.List, params],
        queryFn: () =>
            api.get(
                ApiRoute.List,
                {},
                { params: parseToQueryString(unref(params)) }
            ),
        placeholderData: (previousData) =>
            previousData ? previousData : ListPlaceholder,
    });
