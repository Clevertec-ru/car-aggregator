import { QueryKey } from 'src/constants/query-key';
import { FiltersResponse, FiltersSelect } from './types';
import { useQuery } from '@tanstack/vue-query';
import { api } from 'src/boot/axios';
import { ApiRoute } from 'src/constants/api-route';

export const useFilters = () =>
    useQuery<FiltersResponse, Error, FiltersSelect>({
        queryKey: [QueryKey.Filters],
        queryFn: () => api.get(ApiRoute.Filters),
        select: ({ data: { ms, c, ...rest } }) => {
            const bodyType = c.map(({ i }) => i);

            return {
                carBrand: ms.map(({ i, n }) => ({
                    brandId: Number(i),
                    brandName: n,
                })),
                bodyType,
                ...rest,
            };
        },
    });
