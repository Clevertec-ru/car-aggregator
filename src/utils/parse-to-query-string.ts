export const parseToQueryString = (params: Record<string, any>) => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value == null) {
            return;
        }

        if (Array.isArray(value)) {
            searchParams.append(key, value.join(','));
        } else {
            searchParams.append(key, value);
        }
    });

    return searchParams;
};
