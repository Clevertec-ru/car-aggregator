import { Filters } from 'src/types/filters';

export const DEFAULT_PAGE = 1;
export const DEFAULT_SORT = 'standard';
export const DEFAULT_ORDER = 0;

export const InitialFIlters: Filters = {
    brand: null,
    model: null,
    desc: DEFAULT_ORDER,
    page: DEFAULT_PAGE,
    sort: DEFAULT_SORT,
};
