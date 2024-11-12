import { ApiClient } from 'src/services';
import { BASE_URL } from 'src/services/api-service/constants';

export const api = new ApiClient({
  baseURL: import.meta.env.VITE_API_URL ?? BASE_URL,
  responseType: 'json',
});
