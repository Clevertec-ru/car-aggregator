import { QueryKey } from 'src/constants/query-key';

import { api } from 'src/boot/axios';
import { ApiRoute } from 'src/constants/api-route';
import { useQuery } from '@tanstack/vue-query';
import { ModelsParams, ModelsResponse, ModelsTransformed } from './types';
import { ComputedRef, Ref } from 'vue';

export const useModels = (
  params: ComputedRef<ModelsParams>,
  enabled: Ref<boolean>
) =>
  useQuery<ModelsResponse, Error, ModelsTransformed>({
    queryKey: [QueryKey.Models, params],
    queryFn: () => api.get(`${ApiRoute.Models}/${params.value.modelId}`),
    enabled,
    select({ data }) {
      return { models: data.taxonomy.filters.model.values };
    },
  });
