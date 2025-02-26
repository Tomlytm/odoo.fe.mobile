/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import config from "../app-config";
import axiosInstance from "../axios-config";
// import PUBLIC_API_BASE_URL  from "@env";

const baseUrl = 'http://4.180.77.128:5003';

// console.log("Base URL:", baseUrl);

interface Request {
  url: string;
  body?: any;
  auth?: boolean;
  paginate?: boolean;
  [x: string]: any;
}

const del = async ({ url, body: data }: Request) =>
  (
    await axiosInstance.delete(url, {
      data,
    })
  ).data;

const get = async ({ url, auth = true, paginate = false }: Request) => {
  const response = await (auth
    ? axiosInstance.get(url)
    : axios.get(baseUrl + url));
  const data = response;
  console.log(data, 'data');
  console.log(url, 'url');
  console.log(axiosInstance, 'axiosInstance');
  return data;

};
const getWithRootData = async ({
  url,
  auth = true,
  paginate = false,
}: Request) => {
  const response = await (auth
    ? axiosInstance.get(url)
    : axios.get(baseUrl + url));
  const data = response.data;
  return paginate
    ? {
        data: data.data,
        totalPages: data?.totalPages,
        totalItems: data?.totalRecords,
      }
    : data;
};

const post = async ({ url, body, auth = true, options = {} }: Request) => {
  return (
    await (auth
      ? axiosInstance.post(url, body, options)
      : axios.post(baseUrl + url, body))
  ).data;
};

const postWithRootData = async ({
  url,
  body,
  auth = true,
  options = {},
}: Request) => {
  return (
    await (auth
      ? axiosInstance.post(url, body, options)
      : axios.post(baseUrl + url, body))
  ).data;
};

const patch = async ({ url, body }: Request) =>
  (await axiosInstance.patch(url, body)).data.data;

const put = async ({ url, body }: Request) =>
  (await axiosInstance.put(url, body)).data.data;

const putWithRootData = async ({
  url,
  body,
  auth = true,
  options = {},
}: Request) => {
  return (
    await (auth
      ? axiosInstance.put(url, body, options)
      : axios.put(baseUrl + url, body))
  ).data;
};

const api = {
  delete: del,
  get,
  patch,
  post,
  put,
  getWithRootData,
  postWithRootData,
  putWithRootData,
};

export default api;
