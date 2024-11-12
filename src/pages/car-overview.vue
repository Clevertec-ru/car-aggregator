<script setup lang="ts">
import CategoryFilter from 'components/category-filter.vue';
import SortBar from 'src/components/sort-bar.vue';
import VehicleList from 'components/vehicle-list.vue';
import { DEFAULT_PAGE, InitialFIlters } from 'src/constants/filters';
import { Filters } from 'src/types/filters';
import { reactive, ref, watch } from 'vue';
import { useVehiclesList } from 'src/resources/list';
import { DefaultListParams } from 'src/constants/list-params';
import { computed } from 'vue';
import { VechiclesListParams } from 'src/resources/list/types';
import { uid } from 'quasar';

const filters = reactive<Filters>(InitialFIlters);
const maxPages = ref(1);
const resultsCount = ref(0);
const isSkeletonData = ref(true);
const isResultsStable = ref(false);

const listParams = computed<VechiclesListParams>(() => {
    const { page, desc, sort } = filters;
    const mmmv = filters.brand
        ? [filters.brand ?? '', filters.model ?? '', '', ''].join('|')
        : undefined;

    return {
        ...DefaultListParams,
        search_id: uid().slice(-11),
        mmmv,
        page,
        desc,
        sort,
    };
});

const {
    data: vehiclesListData,
    isPlaceholderData,
    isFetching,
    isFetchedAfterMount,
} = useVehiclesList(listParams);

const listEmpty = computed(
    () => !vehiclesListData.value?.pageProps.listings.length
);

watch(
    [() => filters.sort, () => filters.desc, () => filters.page],
    () => {
        isResultsStable.value = true;
    },
    {
        deep: true,
    }
);

watch(
    [() => filters.sort, () => filters.desc],
    () => {
        filters.page = DEFAULT_PAGE;
    },
    { deep: true }
);

watch(isPlaceholderData, (newIsPlaceholderData) => {
    if (!newIsPlaceholderData) {
        isResultsStable.value = false;
    }

    if (!newIsPlaceholderData && vehiclesListData.value) {
        const { numberOfPages, numberOfResults } =
            vehiclesListData.value.pageProps;

        maxPages.value = numberOfPages;
        resultsCount.value = numberOfResults;

        window.scrollTo({
            top: 0,
        });
    }
});

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
                <SortBar
                    v-model:filters="filters"
                    :loading="isPlaceholderData"
                />
                <VehicleList :params="listParams" :skeleton="isSkeletonData" />

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
