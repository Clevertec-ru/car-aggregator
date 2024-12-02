<script setup lang="ts">
import { QCarousel } from 'quasar';
import { VechicleInfo } from 'src/resources/list/types';
import { ref, toRefs, watch } from 'vue';

const props = defineProps<{ vehicleInfo: VechicleInfo }>();
const { vehicleInfo } = toRefs(props);
const loadedImages = ref(Array(vehicleInfo.value.images.length).fill(false));

const slide = ref<number>(1);

watch(
    slide,
    (newSilde) => {
        const index = Number(newSilde) + 1;

        if (
            index >= 0 &&
            index < vehicleInfo.value.images.length &&
            !loadedImages.value[index]
        ) {
            const img = new Image();
            img.src = vehicleInfo.value.images[index];
            img.onload = () => (loadedImages.value[index] = true);
        }
    },
    {
        immediate: true,
    }
);
</script>

<template>
    <q-card class="vehicle-card fit q-pa-md app-shadow cursor-pointer">
        <q-card-section class="q-gutter-x-md" horizontal>
            <q-carousel
                class="carousel"
                :padding="false"
                swipeable
                height="200px"
                ref="carousel"
                v-model="slide"
                transition-prev="slide-right"
                transition-next="slide-left"
                animated
                control-color="primary"
                control-type="regular"
                infinite
            >
                <template #control>
                    <q-carousel-control
                        position="bottom-right"
                        :offset="[10, 10]"
                        class="carousel-controls q-gutter-xs"
                    >
                        <q-btn
                            v-show="vehicleInfo.images.length > 1"
                            push
                            round
                            dense
                            color="grey-8"
                            text-color="white"
                            icon="arrow_left"
                            @click="($refs.carousel as QCarousel).previous()"
                        />
                        <q-btn
                            v-show="vehicleInfo.images.length > 1"
                            push
                            round
                            dense
                            color="grey-8"
                            text-color="white"
                            icon="arrow_right"
                            @click="($refs.carousel as QCarousel).next()"
                        />
                    </q-carousel-control>

                    <q-carousel-control
                        v-if="vehicleInfo.images.length"
                        position="bottom-left"
                        :offset="[5, 5]"
                    >
                        <q-chip color="grey-8" text-color="white">
                            <q-icon name="mdi-image" class="q-mr-xs" />
                            {{ vehicleInfo.images.length ? slide : 0 }} /
                            {{ vehicleInfo.images.length }}
                        </q-chip>
                    </q-carousel-control>
                </template>

                <q-carousel-slide
                    v-for="(image, i) in vehicleInfo.images.length
                        ? vehicleInfo.images
                        : ['/image-empty.png']"
                    :key="image"
                    :name="i + 1"
                    :img-src="image"
                />
            </q-carousel>

            <q-card-section
                class="column justify-between"
                horizontal
                style="flex: 1"
            >
                <q-card-section class="column" horizontal>
                    <h3 class="q-ma-none text-h6 text-weight-bold text-dark">
                        {{ vehicleInfo.model }}
                    </h3>

                    <span class="text-body1 text-dark">
                        <q-icon class="text-h6" name="mdi-cog"></q-icon>
                        {{ vehicleInfo.title }}
                    </span>
                </q-card-section>

                <q-separator spaced="lg" />

                <q-card-section
                    class="no-padding q-mt-sm row items-end no-wrap justify-between"
                >
                    <div class="column text-body1 text-dark">
                        <div>
                            <span>
                                <q-icon
                                    class="text-h6"
                                    name="mdi-account-tie"
                                ></q-icon>
                                Seller:
                            </span>

                            <span class="q-ml-md">
                                {{ vehicleInfo.seller ?? '-' }}
                            </span>
                        </div>

                        <div class="q-mt-sm">
                            <span>
                                <q-icon
                                    class="text-h6"
                                    name="mdi-link-variant"
                                ></q-icon>
                                Source:
                            </span>
                            <q-btn
                                class="q-ml-sm"
                                size="sm"
                                outline
                                :href="vehicleInfo.linkProvider"
                                target="_blank"
                                :label="vehicleInfo.site"
                                rel="noreferrer nofollow noopener"
                            />
                        </div>
                    </div>

                    <h4
                        class="q-ma-none text-h6 text-weight-bolder text-dark text-right"
                    >
                        {{ vehicleInfo.price.replace(/\.-$/, '') }}
                    </h4>
                </q-card-section>
            </q-card-section>
        </q-card-section>
    </q-card>
</template>

<style scoped lang="scss">
.vehicle-card {
    border-radius: $card-border-radius;
}

.carousel-controls {
    opacity: 0;
    transition: opacity 0.2s;
}

.carousel {
    width: 266px;
}

.carousel:hover .carousel-controls {
    opacity: 1;
}
</style>
