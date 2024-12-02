type SelectModel = {
    i: number | string;
    n: string;
};

export type FiltersResponse = {
    data: {
        ms: SelectModel[];
        ft: SelectModel[];
        fr: number[];
        lsml: number[];
        p: number[];
        tr: SelectModel[];
        c: { i: string }[];
    };
};

export type FiltersSelect = {
    carBrand: { brandId: number; brandName: string }[];
    ft: SelectModel[];
    fr: number[];
    lsml: number[];
    p: number[];
    tr: SelectModel[];
    bodyType: string[];
};
