export type ModelsParams = {
    modelId: number;
};

type Model = {
    label: string;
    value: string;
};

export type ModelsResponse = {
    data: (Model | { optgroupLabel: string; items: Model[] })[];
};

export type ModelsSelect = { modelId: string; modelName: string }[];
