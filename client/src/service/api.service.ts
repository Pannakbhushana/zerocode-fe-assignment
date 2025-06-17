import { AxiosInstance } from 'axios';

import AppService from './app.service';
import { getToken } from '../components/user/user-auth';
// import { handleTokenExpiry } from './token-expiry';

export default class APIService extends AppService {
  apiClient: AxiosInstance;
  apiUrl: string;

  constructor() {
    super();
    // this.apiUrl = `${this.appHost}/api`;
    this.apiUrl = `${process.env.REACT_APP_SERVER_ADDRESS}/api/`;
    this.apiClient = APIService.getAxiosInstance({
      baseURL: this.apiUrl,
    });

    this.apiClient.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token?.token) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${token.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }
}
