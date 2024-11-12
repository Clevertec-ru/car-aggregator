<script setup lang="ts"></script>

<template>
    <q-layout class="layout" view="hhh lPR fFf">
        <q-header class="bg-white text-dark shadow-up-3">
            <q-toolbar class="container q-mx-auto">
                <q-toolbar-title class="row text-primary" style="color: #fff">
                    <q-img
                        src="/logo.svg"
                        height="30px"
                        width="100px"
                        fit="contain"
                    />
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-page-container class="container q-mx-auto">
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<style scoped lang="scss">
.container {
    max-width: $breakpoint-lg-min;

    .container-card {
        border-radius: $card-border-radius;
    }
}
</style>
