<script setup lang="ts">
import { SortOptions } from 'src/constants/select-default-options';
import { Filters } from 'src/types/filters';

defineProps<{ loading: boolean }>();

const filters = defineModel<Filters>('filters', { required: true });

const changeOrder = () => (filters.value.desc = filters.value.desc ? 0 : 1);
</script>

<template>
    <section class="q-mb-md row justify-end items-center q-gutter-x-sm">
        <q-btn
            flat
            dense
            :disable="loading"
            color="primary"
            @click="changeOrder"
            :icon="filters.desc ? 'arrow_downward' : 'arrow_upward'"
            :label="filters.desc ? 'Descending' : 'Ascending'"
        >
        </q-btn>
        <q-select
            class="sort-select"
            outlined
            :disable="loading"
            emit-value
            map-options
            label="Sort"
            bg-color="white"
            v-model="filters.sort"
            options-dense
            :options="SortOptions"
        />
    </section>
</template>

<style scoped lang="scss">
.sort-select {
    min-width: 200px;
}
</style>
