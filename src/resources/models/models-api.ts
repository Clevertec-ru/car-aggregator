import { QueryKey } from 'src/constants/query-key';

import { api } from 'src/boot/axios';
import { ApiRoute } from 'src/constants/api-route';
import { useQuery } from '@tanstack/vue-query';
import { ModelsParams, ModelsResponse, ModelsSelect } from './types';
import { ComputedRef, Ref } from 'vue';

export const useModels = (
    params: ComputedRef<ModelsParams>,
    enabled: Ref<boolean>
) =>
    useQuery<ModelsResponse, Error, ModelsSelect>({
        queryKey: [QueryKey.Models, params],
        queryFn: () => api.get(`${ApiRoute.Models}/${params.value.modelId}`),
        enabled,
        select: ({ data }) => {
            const options: { modelId: string; modelName: string }[] = [];

            for (const item of data) {
                if ('items' in item) {
                    const flatItems = item.items.map(({ label, value }) => ({
                        modelId: value,
                        modelName: label,
                    }));

                    options.push(...flatItems);
                } else {
                    const { label, value } = item;

                    options.push({
                        modelId: value,
                        modelName: label,
                    });
                }
            }

            return options;
        },
    });
