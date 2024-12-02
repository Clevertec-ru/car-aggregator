import { Filters } from 'src/types/filters';

export const DEFAULT_PAGE = 1;
export const DEFAULT_SORT = 'standard';
export const DEFAULT_ORDER = 0;

export const InitialFIlters: () => Filters = () => ({
    carBrand: null,
    carModel: null,
    price: {},
    firstRegistration: { yearFrom: null, yearTo: null },
    mileage: { mileageFrom: null, mileageTo: null },
    transmissionType: [],
    fuelType: [],
    bodyType: [],
    page: DEFAULT_PAGE,
});
