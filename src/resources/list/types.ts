import { CountryCode, SellerType } from 'src/constants/vehicle-list';

export type VechiclesListParams = {
    atype: string;
    cy: string[];
    damaged_listing: string;
    powertype: string;
    source: string;
    ustate: string[];
    desc: 0 | 1;
    sort: string;
    search_id?: string;
    mmmv?: string;
};

export type VechicleInfo = {
    id: string;
    images: string[];
    price: {
        priceFormatted: string;
    };
    url: string;
    vehicle: {
        articleType: string;
        make: string;
        model: string;
        modelVersionInput: string;
        subtitle: string | null;
        offerType: string;
    };
    seller: {
        id: string;
        type: SellerType;
        companyName?: string;
        logo?: {
            small?: {
                href?: string;
            };
        };
    };
    location: {
        countryCode: keyof typeof CountryCode;
        zip: string;
        city: string;
    };
    vehicleDetails: {
        data: string;
        iconName: string;
    }[];
};

export type VechiclesListResponse = {
    pageProps: {
        numberOfResults: number;
        numberOfPages: number;
        listings: VechicleInfo[];
    };
};
