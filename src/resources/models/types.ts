export type ModelsParams = {
  modelId: number;
};

type Model = {
  id: number;
  name: string;
  makeId: number;
};

type ModelGroup = Model & { vehicleTypeId: string };

export type ModelsResponse = {
  data: {
    taxonomy: {
      filters: {
        model: {
          values: Model[];
        };
        modelGroup: {
          values: ModelGroup[];
        };
        modelLine: {
          values: ModelGroup[];
        };
      };
    };
  };
};

export type ModelsTransformed = {
  models: Model[];
};
