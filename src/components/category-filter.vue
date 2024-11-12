<script setup lang="ts">
import {
    DefaultBrands,
    DefaultModels,
} from 'src/constants/select-default-options';
import { useFilters } from 'src/resources/filters';
import { useModels } from 'src/resources/models';
import { Filters } from 'src/types/filters';
import { computed, watch } from 'vue';

defineProps<{
    resultsCount?: number;
    loading: boolean;
    resultsLoading: boolean;
}>();

const filters = defineModel<Filters>('filters', { required: true });

const { data: filtersData, isSuccess: isBrandSuccess } = useFilters();

const brandFilters = computed(() =>
    isBrandSuccess && filtersData.value?.brand.length
        ? [DefaultBrands, ...filtersData.value.brand]
        : [DefaultBrands]
);

const modelsEnabled = computed(() => isBrandSuccess && !!filters.value.brand);

const paramsBrand = computed(() => ({
    modelId: filters.value.brand ?? 0,
}));

const { data: modelsData, isSuccess: isModelsSuccess } = useModels(
    paramsBrand,
    modelsEnabled
);

const modelFilters = computed(() =>
    isModelsSuccess && modelsData.value?.models.length
        ? [DefaultModels, ...modelsData.value.models]
        : [DefaultModels]
);

watch(
    () => filters.value.brand,
    () => (filters.value.model = null)
);

const resetBrand = () => {
    filters.value.brand = null;
    filters.value.model = null;
};

const resetModel = () => {
    filters.value.model = null;
};
</script>

<template>
    <q-card class="filter-card fit q-pa-md app-shadow">
        <h2 class="q-mt-none q-mb-lg text-h6 text-dark">Filters</h2>

        <q-form class="q-gutter-y-md">
            <q-select
                label="Brand"
                :clearable="!!filters.brand"
                :disable="loading"
                outlined
                emit-value
                map-options
                v-model="filters.brand"
                :options="brandFilters"
                @clear="resetBrand"
            />
            <q-select
                label="Model"
                outlined
                :clearable="!!filters.model"
                v-model="filters.model"
                :disable="!modelsEnabled || loading"
                emit-value
                map-options
                :options="modelFilters"
                option-value="id"
                option-label="name"
                @clear="resetModel"
            />
        </q-form>

        <div class="q-mt-md flex flex-center">
            <q-chip
                class="q-py-sm text-body1 fit"
                color="primary"
                text-color="white"
                style="height: auto"
            >
                <div v-if="resultsLoading" class="text-center fit">
                    <q-spinner class="q-ml-xs" size="sm" />
                </div>

                <div class="row fit items-center justify-center" v-else>
                    <q-icon
                        class="q-mr-xs"
                        name="mdi-magnify"
                        size="19px"
                        style="margin-bottom: 2px"
                    />
                    <span class="text-center">
                        {{ resultsCount?.toLocaleString('en-US') }}
                        results founded
                    </span>
                </div>
            </q-chip>
        </div>
    </q-card>
</template>

<style scoped lang="scss">
.filter-card {
    border-radius: $card-border-radius;
    max-width: 400px;
}
</style>
