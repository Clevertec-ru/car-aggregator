<script setup lang="ts">
import CategoryFilter from 'components/category-filter.vue';
import VehicleList from 'components/vehicle-list.vue';
import { DEFAULT_PAGE, InitialFIlters } from 'src/constants/filters';
import { Filters } from 'src/types/filters';
import { reactive, ref, watch, computed } from 'vue';
import { useVehiclesList } from 'src/resources/list';
import { VechiclesListParams } from 'src/resources/list/types';
import { useQuasar } from 'quasar';

const filters = reactive<Filters>(InitialFIlters());
const maxPages = ref(20);
const resultsCount = ref(0);
const isSkeletonData = ref(true);
const isResultsStable = ref(false);

const $q = useQuasar();

const listParams = computed<VechiclesListParams>(() => {
    const { carBrand, carModel, ...restFilter } = filters;

    return {
        carBrand: carBrand ?? {},
        carModel: carModel ?? {},
        ...restFilter,
    };
});

const {
    data: vehiclesListData,
    isPlaceholderData,
    isFetching,
    isFetchedAfterMount,
} = useVehiclesList(listParams);

const listEmpty = computed(() => !vehiclesListData.value?.length);

watch(
    () => ({ ...filters }),
    (newFilters, oldFilters) => {
        if (newFilters.page === oldFilters.page) {
            filters.page = DEFAULT_PAGE;
        }
    },
    { deep: true }
);

watch(
    () => filters.page,
    () => {
        window.scrollTo({
            top: 0,
        });

        isResultsStable.value = true;
    }
);

watch(
    isPlaceholderData,
    (newIsPlaceholderData) => {
        if (!newIsPlaceholderData) {
            isResultsStable.value = false;

            $q.loading.hide();
        } else {
            $q.loading.show();
        }
    },
    {
        immediate: true,
    }
);

watch(isFetchedAfterMount, () => (isSkeletonData.value = false), {
    once: true,
});
</script>

<template>
    <q-page padding>
        <section class="row q-mt-lg no-wrap q-gutter-x-md">
            <CategoryFilter
                v-model:filters="filters"
                :resultsCount
                :loading="isFetching"
                :results-loading="!isResultsStable && isFetching"
            />
            <div class="column fit">
                <VehicleList
                    :params="listParams"
                    :skeleton="isPlaceholderData"
                />

                <div
                    v-if="!isSkeletonData && !listEmpty"
                    class="pagination-container q-pa-lg flex flex-center"
                >
                    <q-pagination
                        class="pagination q-pa-sm rounded-borders"
                        v-model="filters.page"
                        :disable="isPlaceholderData"
                        :max-pages="10"
                        ellipses
                        :max="maxPages"
                        gutter="sm"
                        boundary-numbers
                        direction-links
                    />
                </div>
            </div>
        </section>
    </q-page>
</template>

<style scoped lang="scss">
.pagination-container {
    position: sticky;
    bottom: -24px;
    z-index: $z-max;
}

.pagination {
    background-color: #edf1f8;
}
</style>
