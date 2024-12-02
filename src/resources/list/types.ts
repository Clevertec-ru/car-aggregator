export type VechiclesListParams = {
    carBrand: {
        brandId?: number;
        brandName?: string;
    };
    carModel: {
        modelId?: string;
        modelName?: string;
    };
    price: {
        priceFrom?: number;
        priceTo?: number;
    };
    firstRegistration: {
        yearFrom: number | null;
        yearTo: number | null;
    };
    mileage: {
        mileageFrom: number | null;
        mileageTo: number | null;
    };
    transmissionType: string[];
    fuelType: string[];
    bodyType: string[];
    page: number;
};

export type VechicleInfo = {
    model: string;
    title: string;
    price: string;
    linkProvider: string;
    images: string[];
    site: string;
    seller?: string;
};

export type VechiclesListResponse = VechicleInfo[];
