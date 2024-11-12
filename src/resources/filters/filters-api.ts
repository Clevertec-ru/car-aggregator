import { QueryKey } from 'src/constants/query-key';
import { FiltersResponse, FiltersTransformed } from './types';
import { useQuery } from '@tanstack/vue-query';
import { api } from 'src/boot/axios';
import { ApiRoute } from 'src/constants/api-route';

export const useFilters = () =>
  useQuery<FiltersResponse, Error, FiltersTransformed>({
    queryKey: [QueryKey.Filters],
    queryFn: () => api.get(ApiRoute.Filters),
    select(data) {
      return {
        brand: [
          ...data.pageProps.taxonomy.topMakes,
          ...data.pageProps.taxonomy.otherMakes,
        ],
      };
    },
  });
