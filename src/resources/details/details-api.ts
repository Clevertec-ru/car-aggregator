import { QueryKey } from 'src/constants/query-key';

import { api } from 'src/boot/axios';
import { ApiRoute } from 'src/constants/api-route';
import { useQuery } from '@tanstack/vue-query';
import { DetailsParams, DetailsResponse } from './types';

export const useDetails = (params: DetailsParams) =>
  useQuery<DetailsResponse>({
    queryKey: [QueryKey.Details, params],
    queryFn: () => api.get(`${ApiRoute.Details}/${params.detailId}`),
  });
