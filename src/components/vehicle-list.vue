<script setup lang="ts">
import { useVehiclesList } from 'src/resources/list';
import VehicleCard from './vehicle-card.vue';

import { VechiclesListParams } from 'src/resources/list/types';
import { computed, toRefs } from 'vue';
import CardSkeleton from './card-skeleton.vue';

const props = defineProps<{ params: VechiclesListParams; skeleton: boolean }>();
const { params, skeleton } = toRefs(props);

const { data: vehiclesListData, isPlaceholderData } = useVehiclesList(params);

const listEmpty = computed(
    () => !isPlaceholderData && !vehiclesListData.value?.length
);
</script>

<template>
    <section class="column fit q-gutter-y-md relative-position">
        <div v-if="listEmpty" class="q-mt-xl fit text-center">
            <q-img src="/list-empty.png" height="150px" width="150px" />
            <h4 class="q-my-sm text-h6 text-dark">No matching results</h4>
        </div>

        <template v-else>
            <template
                v-for="(vehicleInfo, i) in vehiclesListData"
                :key="vehicleInfo.model + i"
            >
                <CardSkeleton v-if="skeleton" />

                <VehicleCard v-else :vehicleInfo />
            </template>
        </template>
    </section>
</template>
