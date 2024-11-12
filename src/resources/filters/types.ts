type Makes = {
  value: number;
  label: string;
};

export type FiltersResponse = {
  pageProps: {
    taxonomy: {
      topMakes: Makes[];
      otherMakes: Makes[];
    };
  };
};

export type FiltersTransformed = {
  brand: Makes[];
};
