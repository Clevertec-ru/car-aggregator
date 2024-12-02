<script setup lang="ts">
import { InitialFIlters } from 'src/constants/filters';
import { useFilters } from 'src/resources/filters';
import { useModels } from 'src/resources/models';
import { Filters } from 'src/types/filters';
import { computed, ref, watch } from 'vue';

defineProps<{
    resultsCount?: number;
    loading: boolean;
    resultsLoading: boolean;
}>();

const filters = defineModel<Filters>('filters', { required: true });

const transmission = ref<string[]>([]);
const fuel = ref<string[]>([]);
const carBody = ref<string[]>([]);

const { data: filtersData, isSuccess: isFiltersSuccess } = useFilters();

const modelsEnabled = computed(
    () => isFiltersSuccess && !!filters.value.carBrand
);

const paramsBrand = computed(() => ({
    modelId: filters.value.carBrand?.brandId ?? 0,
}));

const { data: modelsData } = useModels(paramsBrand, modelsEnabled);

const yearToOptions = computed(() => {
    if (!filtersData.value?.fr) {
        return [];
    }

    return filtersData.value?.fr.filter((year) => {
        const filterFrom = filters.value.firstRegistration.yearFrom;

        if (filterFrom) {
            return year >= filterFrom;
        }

        return true;
    });
});

const priceToOptions = computed(() => {
    if (!filtersData.value?.p) {
        return [];
    }

    return filtersData.value?.p.filter((price) => {
        const priceFrom = filters.value.price.priceFrom;

        if (priceFrom) {
            return price >= priceFrom;
        }

        return true;
    });
});

const milageToOptions = computed(() => {
    if (!filtersData.value?.lsml) {
        return [];
    }

    return filtersData.value?.lsml.filter((milage) => {
        const milageFrom = filters.value.mileage.mileageFrom;

        if (milageFrom) {
            return milage >= milageFrom;
        }

        return true;
    });
});

const applyTransmissionFilter = () =>
    (filters.value.transmissionType = transmission.value);

const applyFuelFilter = () => (filters.value.fuelType = fuel.value);

const applyCarBodyFilter = () => (filters.value.bodyType = carBody.value);

const resetBrand = () => {
    filters.value.carBrand = null;
    filters.value.carModel = null;
};

const resetModel = () => {
    filters.value.carModel = null;
};

const resetFilters = () => {
    Object.assign(filters.value, InitialFIlters());
    transmission.value = [];
    fuel.value = [];
    carBody.value = [];
};

watch(
    () => filters.value.carBrand,
    () => (filters.value.carModel = null)
);

watch(
    () => filters.value.firstRegistration.yearFrom,
    (newYearFrom) => {
        const yearTo = filters.value.firstRegistration.yearTo;

        if (newYearFrom && yearTo && newYearFrom > yearTo) {
            filters.value.firstRegistration.yearTo = newYearFrom;
        }
    }
);

watch(
    () => filters.value.price.priceFrom,
    (newPriceFrom) => {
        const priceTo = filters.value.price.priceTo;

        if (newPriceFrom && priceTo && newPriceFrom > priceTo) {
            filters.value.price.priceTo = newPriceFrom;
        }
    }
);

watch(
    () => filters.value.mileage.mileageFrom,
    (newMilageFrom) => {
        const milageTo = filters.value.mileage.mileageTo;

        if (newMilageFrom && milageTo && newMilageFrom > milageTo) {
            filters.value.mileage.mileageTo = newMilageFrom;
        }
    }
);
</script>

<template>
    <q-card class="filter-card fit q-pa-md app-shadow">
        <div class="q-mb-lg row no-wrap justify-between items-center">
            <h2 class="no-margin text-h6 text-dark">Filters</h2>
            <q-btn label="reset" size="md" flat @click="resetFilters" />
        </div>

        <q-form class="q-gutter-y-md">
            <q-select
                label="Brand"
                :clearable="!!filters.carBrand"
                :disable="loading"
                outlined
                option-value="brandId"
                option-label="brandName"
                v-model="filters.carBrand"
                :options="filtersData?.carBrand ?? []"
                @clear="resetBrand"
            />
            <q-select
                label="Model"
                outlined
                :clearable="!!filters.carModel"
                v-model="filters.carModel"
                :disable="!modelsEnabled || loading"
                :options="modelsData ?? []"
                option-value="modelId"
                option-label="modelName"
                @clear="resetModel"
            />

            <div class="q-mt-md">
                <span class="text-dark text-body1 text-weight-medium"
                    >First registration date, year</span
                >

                <div class="q-mt-sm row no-wrap">
                    <q-select
                        class="full-width"
                        label="From"
                        outlined
                        :clearable="!!filters.firstRegistration.yearFrom"
                        v-model="filters.firstRegistration.yearFrom"
                        :disable="loading"
                        :options="filtersData?.fr ?? []"
                    />

                    <q-select
                        class="full-width q-gutter-x-md"
                        label="To"
                        outlined
                        :clearable="!!filters.firstRegistration.yearTo"
                        v-model="filters.firstRegistration.yearTo"
                        :disable="loading"
                        :options="yearToOptions"
                    />
                </div>
            </div>

            <div class="q-mt-md">
                <span class="text-dark text-body1 text-weight-medium"
                    >Price, €</span
                >

                <div class="q-mt-sm row no-wrap">
                    <q-select
                        class="full-width"
                        label="From, €"
                        outlined
                        :clearable="!!filters.price.priceFrom"
                        v-model="filters.price.priceFrom"
                        :disable="loading"
                        :options="filtersData?.p ?? []"
                    />

                    <q-select
                        class="full-width q-gutter-x-md"
                        label="To, €"
                        outlined
                        :clearable="!!filters.price.priceTo"
                        v-model="filters.price.priceTo"
                        :disable="loading"
                        :options="priceToOptions"
                    />
                </div>
            </div>

            <div class="q-mt-md">
                <span class="text-dark text-body1 text-weight-medium"
                    >Mileage, km</span
                >

                <div class="q-mt-sm row no-wrap">
                    <q-select
                        class="full-width"
                        label="From, km"
                        outlined
                        :clearable="!!filters.mileage.mileageFrom"
                        v-model="filters.mileage.mileageFrom"
                        :disable="loading"
                        :options="filtersData?.lsml ?? []"
                    />

                    <q-select
                        class="full-width q-gutter-x-md"
                        label="To, km"
                        outlined
                        :clearable="!!filters.mileage.mileageTo"
                        v-model="filters.mileage.mileageTo"
                        :disable="loading"
                        :options="milageToOptions"
                    />
                </div>
            </div>

            <q-select
                multiple
                label="Transmission"
                outlined
                emit-value
                map-options
                v-model="transmission"
                :disable="loading"
                option-value="i"
                option-label="n"
                @popup-hide="applyTransmissionFilter"
                :options="filtersData?.tr ?? []"
                popup-content-class="text-grey-6"
            />

            <q-select
                multiple
                label="Fuel"
                outlined
                emit-value
                map-options
                v-model="fuel"
                :disable="loading"
                option-value="i"
                option-label="n"
                @popup-hide="applyFuelFilter"
                :options="filtersData?.ft ?? []"
                popup-content-class="text-grey-5"
            />

            <q-select
                multiple
                label="Body type"
                outlined
                v-model="carBody"
                :disable="loading"
                @popup-hide="applyCarBodyFilter"
                :options="filtersData?.bodyType ?? []"
                popup-content-class="text-grey-5"
            />
        </q-form>
    </q-card>
</template>

<style scoped lang="scss">
.filter-card {
    border-radius: $card-border-radius;
    max-width: 400px;
}
</style>
