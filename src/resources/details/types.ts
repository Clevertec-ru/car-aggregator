export type DetailsParams = {
  detailId: string;
};

export type DetailsResponse = {
  pageProps: {
    listingDetails: {
      id: string;
      description: string;
      images: string[];
      imgAltText: string;
      price: {
        priceFormatted: string;
      };
    };
  };
};
