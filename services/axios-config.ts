/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import config from "./app-config";
import { getSecureStorage } from "./formats";

const baseURL = 'http://4.180.77.128:5003';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

// const refreshToken = async (originalRequest: AxiosRequestConfig) => {
//   try {
//     const token = getLocalStorage(config.refreshTokenKey);
//     const url = `${baseURL}/Account/refresh-token?token=${token?.refreshToken}`;

//     const { data, ...response } = await axios.post(url);

//     if (data.status === 200) {
//       // old request and save new token
//       saveLocalStorage(data, config.tokenKey);

//       if (originalRequest && originalRequest.headers) {
//         originalRequest.headers.Authorization = `Bearer ${data?.jwToken}`;
//       }

//       axios(originalRequest).then(onResponse).catch(onResponseError);

//       return { data, ...response };
//     }

//     // window.location.href = `${routes.auth.logout.path}?next=${window.location.pathname}`;
//     clearLocalStorage(config.tokenKey);
//     //window.location.pathname = "/";
//     return await Promise.reject(response);
//   } catch (error) {
//     clearLocalStorage(config.tokenKey);
//     // setTimeout(() => {
//     //   window.location.pathname = "/";
//     // }, 1000);
//     return await Promise.reject(error);
//   }
// };

const onRequest = async (
  request: AxiosRequestConfig
): Promise<InternalAxiosRequestConfig<any>> => {
  try {
    const tokenData = await getSecureStorage(config.tokenKey);
    // console.log(tokenData,'token' );
    const token = tokenData ? tokenData : "";
    console.log(token,'tokenkk' );
    if (!request.headers) return request as InternalAxiosRequestConfig<any>;
    
    request.headers.Authorization = `Bearer ${token}`;
    return request as InternalAxiosRequestConfig<any>;
  } catch (error) {
    console.error("Error retrieving token:", error);
    return request as InternalAxiosRequestConfig<any>;
  }
};


const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  return await Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: AxiosError | any) => {
  const originalRequest: any = error.config;
  const statusCode = error.response!.status;

  if (statusCode === 401) {
    // const response = await refreshToken(originalRequest);
    const response = "";
    return response;
  }

  return await Promise.reject(error?.response?.data || error.message);
};

// https://axios-http.com/docs/interceptors
axiosInstance.interceptors.request.use(onRequest, onRequestError);
axiosInstance.interceptors.response.use(onResponse, onResponseError);

export default axiosInstance;
