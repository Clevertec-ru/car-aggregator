import { ApiClient } from 'src/services';

export const api = new ApiClient({
    baseURL: `${window.location.origin}/api/v1`,
    responseType: 'json',
});
