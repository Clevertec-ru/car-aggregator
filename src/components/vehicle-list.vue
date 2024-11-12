<script setup lang="ts">
import { useVehiclesList } from 'src/resources/list';
import VehicleCard from './vehicle-card.vue';

import { VechiclesListParams } from 'src/resources/list/types';
import { computed, ref, toRefs, watch } from 'vue';
import CardSkeleton from './card-skeleton.vue';

const props = defineProps<{ params: VechiclesListParams; skeleton: boolean }>();
const { params, skeleton } = toRefs(props);
const scrollPosition = ref(0);

const { data: vehiclesListData, isPlaceholderData } = useVehiclesList(params);

const listEmpty = computed(
    () => !vehiclesListData.value?.pageProps.listings.length
);

watch([skeleton, isPlaceholderData], ([newSkeleton, newIsPlaceholderData]) => {
    if (!newSkeleton && newIsPlaceholderData) {
        scrollPosition.value = window.scrollY;

        document.body.classList.add('no-scroll');
    } else {
        document.body.classList.remove('no-scroll');
        scrollPosition.value = 0;
    }
});
</script>

<template>
    <section class="column fit q-gutter-y-md relative-position">
        <div v-if="listEmpty" class="q-mt-xl fit text-center">
            <q-img src="/list-empty.png" height="150px" width="150px" />
            <h4 class="q-my-sm text-h6 text-dark">No matching results</h4>
        </div>

        <template v-else>
            <template
                v-for="vehicleInfo in vehiclesListData?.pageProps.listings"
                :key="vehicleInfo.id"
            >
                <CardSkeleton v-if="skeleton" />

                <VehicleCard v-else :vehicleInfo />
            </template>
        </template>

        <q-inner-loading :showing="!skeleton && isPlaceholderData">
            <q-spinner
                class="absolute"
                size="40px"
                color="primary"
                :style="{ top: `calc(${scrollPosition}px + 30dvh)` }"
            />
        </q-inner-loading>
    </section>
</template>
