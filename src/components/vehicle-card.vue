<script setup lang="ts">
import { QCarousel } from 'quasar';
import { CountryCode, SellerType } from 'src/constants/vehicle-list';
import { VechicleInfo } from 'src/resources/list/types';
import { computed, ref, toRefs, watch } from 'vue';

const props = defineProps<{ vehicleInfo: VechicleInfo }>();
const { vehicleInfo } = toRefs(props);
const loadedImages = ref(Array(vehicleInfo.value.images.length).fill(false));

const slide = ref<number>(1);

const sellerName = computed(() => {
    const { type, companyName } = vehicleInfo.value.seller;

    return type === SellerType.Dealer ? companyName : SellerType.Private;
});

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

            <q-card-section class="column" horizontal style="flex: 1">
                <q-card-section class="column" horizontal>
                    <h3 class="q-ma-none text-h6 text-weight-bold text-dark">
                        {{ vehicleInfo.vehicle.make }}
                        {{ vehicleInfo.vehicle.model }}
                        <p class="text-body1 text-weight-bold">
                            {{ vehicleInfo.vehicle.modelVersionInput }}
                        </p>
                    </h3>
                </q-card-section>

                <q-card-section
                    class="row inline no-padding q-mb-md q-gutter-x-md items-center text-body1 text-dark"
                >
                    <span>
                        <q-icon
                            class="text-h6"
                            name="mdi-road-variant"
                        ></q-icon>
                        {{ vehicleInfo.vehicleDetails[0].data }}
                    </span>

                    <span>
                        <q-icon
                            class="text-h6"
                            name="mdi-car-shift-pattern"
                        ></q-icon>
                        {{ vehicleInfo.vehicleDetails[1].data }}
                    </span>

                    <span>
                        <q-icon
                            class="text-h6"
                            name="mdi-calendar-blank"
                        ></q-icon>
                        {{ vehicleInfo.vehicleDetails[2].data }}
                    </span>

                    <span>
                        <q-icon class="text-h6" name="mdi-fuel"></q-icon>
                        {{ vehicleInfo.vehicleDetails[3].data }}
                    </span>

                    <span>
                        <q-icon class="text-h6" name="mdi-speedometer"></q-icon>
                        {{ vehicleInfo.vehicleDetails[4].data }}
                    </span>
                </q-card-section>

                <q-card-section class="no-padding q-my-sm">
                    <div class="column text-body1 text-dark">
                        <span>
                            <q-icon
                                class="text-h6"
                                name="mdi-map-marker-radius"
                            ></q-icon>
                            Location
                        </span>
                        <div class="q-mt-xs">
                            <span class="q-ml-sm">
                                <span
                                    :class="`fi fi-${vehicleInfo.location.countryCode.toLocaleLowerCase()}`"
                                ></span>
                                {{
                                    CountryCode[
                                        vehicleInfo.location.countryCode
                                    ]
                                }}, {{ vehicleInfo.location.city }},
                                {{ vehicleInfo.location.zip }}</span
                            >
                        </div>
                    </div>
                </q-card-section>

                <q-separator />

                <q-card-section
                    class="no-padding q-mt-sm row items-end justify-between"
                >
                    <div class="column text-body1 text-dark">
                        <span class="">
                            <q-icon
                                class="text-h6"
                                name="mdi-account-tie"
                            ></q-icon>
                            Seller
                        </span>
                        <div>
                            <q-img
                                v-if="vehicleInfo.seller.logo?.small?.href"
                                :src="vehicleInfo.seller.logo?.small?.href"
                                height="40px"
                                width="40px"
                                spinner-size="20px"
                                fit="contain"
                            />
                            <span class="q-ml-sm"> {{ sellerName }}</span>
                        </div>
                    </div>

                    <h4
                        class="q-ma-none text-h6 text-weight-bolder text-dark text-right"
                    >
                        {{
                            vehicleInfo.price.priceFormatted
                                .slice(0, -2)
                                .replace(' ', '')
                        }}
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
