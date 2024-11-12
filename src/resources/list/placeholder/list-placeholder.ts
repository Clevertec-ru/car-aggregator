import { uid } from 'quasar';
import { AUTOSCOUT_PER_PAGE } from 'src/constants/pagination';
import { SellerType } from 'src/constants/vehicle-list';
import { VechicleInfo, VechiclesListResponse } from 'src/resources/list/types';

export const VehiclePlaceholder: VechicleInfo = {
    id: uid(),
    images: [],
    location: {
        city: '',
        countryCode: 'DE',
        zip: '',
    },
    price: {
        priceFormatted: '',
    },
    seller: {
        id: '0',
        type: SellerType.Private,
    },
    url: '',
    vehicle: {
        articleType: '',
        make: '',
        model: '',
        modelVersionInput: '',
        subtitle: null,
        offerType: '',
    },
    vehicleDetails: [],
};

export const ListPlaceholder: VechiclesListResponse = {
    pageProps: {
        numberOfPages: 0,
        numberOfResults: 0,
        listings: Array(AUTOSCOUT_PER_PAGE).fill(VehiclePlaceholder),
    },
};
