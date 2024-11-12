<script setup lang="ts"></script>

<template>
    <q-card class="vehicle-card fit q-pa-md app-shadow cursor-pointer">
        <q-card-section class="q-gutter-x-md" horizontal>
            <q-skeleton height="200px" width="266px" square />

            <q-card-section
                class="column justify-between"
                horizontal
                style="flex: 1"
            >
                <q-card-section class="column" horizontal>
                    <q-skeleton type="rect" width="30%" />
                    <q-skeleton class="q-mt-sm" type="rect" width="50%" />
                </q-card-section>

                <q-card-section
                    class="row inline q-mt-md no-padding q-mb-md q-gutter-x-md items-center text-body1 text-dark"
                >
                    <q-skeleton width="100px" type="rect" />
                    <q-skeleton width="100px" type="rect" />
                    <q-skeleton width="100px" type="rect" />
                    <q-skeleton width="100px" type="rect" />
                </q-card-section>

                <q-card-section class="no-padding q-my-sm">
                    <q-skeleton type="rect" width="30%" />
                </q-card-section>

                <q-separator />

                <q-card-section
                    class="no-padding q-mt-sm row items-end justify-between"
                >
                    <q-skeleton type="rect" width="40%" />

                    <q-skeleton type="rect" width="20%" />
                </q-card-section>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>

<style scoped></style>
