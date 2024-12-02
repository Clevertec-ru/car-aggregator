export type Filters = {
    carBrand: {
        brandId: number;
        brandName: string;
    } | null;
    carModel: {
        modelId: string;
        modelName: string;
    } | null;
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
