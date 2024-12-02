import { AUTOSCOUT_PER_PAGE } from 'src/constants/pagination';
import { VechicleInfo, VechiclesListResponse } from 'src/resources/list/types';

export const VehiclePlaceholder: VechicleInfo = {
    images: [],
    price: '',
    linkProvider: '',
    model: '',
    site: '',
    title: '',
};

export const ListPlaceholder: VechiclesListResponse =
    Array(AUTOSCOUT_PER_PAGE).fill(VehiclePlaceholder);
