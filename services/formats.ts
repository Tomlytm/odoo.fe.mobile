/* eslint-disable no-plusplus */
/* eslint-disable default-param-last */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { QueryParams } from "@/interfaces/query-params";
import config from "./app-config";
// import { toast } from "react-toastify";
// import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
// import { notification } from "antd";
import * as SecureStore from "expo-secure-store";

export const saveSecureStorage = async (key: string, value: any) => {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
};

export const getSecureStorage = async (key: string) => {
  const data = await SecureStore.getItemAsync(key);
  return data ? JSON.parse(data) : null;
};


export const saveLocalStorage = (data: any, key: string) => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
    return true;
  } catch (error:any) {
    // toast.error(error?.message || "An error occurred while saving data.");
    return false;
  }
};

export const getLocalStorage = (key: string) => {
  try {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) return null;
    return JSON.parse(jsonData);
  } catch (error:any) {
    // toast.error(error?.message || "An error occurred while getting data.");
    return null;
  }
};

export const clearLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error: any) {
    // toast.error(error?.message || "An error occurred while clearing data.");
    return null;
  }
  return null;
};

export const checkToken = () => {
  const token = getLocalStorage(config.tokenKey);

  return !!token;
};

export const checkRoles = () => {
  const token = getLocalStorage(config.tokenKey);
  return token?.roles;
};

export const getQueryKeys = (namespace: string) => ({
  create: `${namespace}/create`,
  read: `${namespace}/read`,
  readOne: `${namespace}/readOne`,
  update: `${namespace}/update`,
  patch: `${namespace}/patch`,
  put: `${namespace}/put`,
  delete: `${namespace}/delete`,
});

export function handleErrors(err: any) {
  const { response, message } = err;
  const { data } = response || {};
  if (message) return message;
  if (data) {
    if (data.message) return data.message;
    if (data.errors) {
      if (typeof data.errors === "string") return data.errors;
      if (Array.isArray(data.errors)) return data.errors[0];
    }
  }
  if (err.errors) {
    const firstError = Object.values(err.errors)[0];
    if (firstError) return firstError;
  }

  return "An Error Occurred. Please try again";
}

export const formatFormData = (values: any[]) => {
  const formData = new FormData();
  const imageKeys: string[] = [];
  const arrayKeys: string[] = [];
  const arr = Object.keys(values);
  arr.forEach((el: any) => {
    if (imageKeys.includes(el)) {
      for (let i = 0; i < values[el].length; i++) {
        formData.append(el, values[el][i]);
      }
    } else if (arrayKeys.includes(el)) {
      for (let j = 0; j < values[el].length; j++) {
        formData.append(`${el}[]`, values[el][j]);
      }
    } else {
      formData.append(el, values[el]);
    }
  });
  return formData;
};

export const formatDate = (date: string) => {
  return Math.floor(Date.parse(date) / 1000).toString();
};
// export const parseDate = (timestamp: string) => {
//   const milliseconds = parseInt(timestamp, 10) * 1000; // Convert to milliseconds
//   const date = new Date(milliseconds);
//   if (date.toString() === "Invalid Date") return "";

//   // Format the date and time
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
//   const day = String(date.getDate()).padStart(2, "0");

//   return `${day}-${month}-${year}`;
// };
export const parseDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp, 10) * 1000);
  return !isNaN(date.getTime()) ? date.toISOString().split("T")[0] : "";
};


export const parseDateTime = (timestamp: string): string => {
  const milliseconds = parseInt(timestamp, 10) * 1000; // Convert to milliseconds
  const date = new Date(milliseconds);
  if (date.toString() === "Invalid Date") return "";

  // Format the date and time
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  // const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};

export const parseDateTime2 = (timestamp: string): string => {
  const milliseconds = parseInt(timestamp, 10) * 1000; // Convert to milliseconds
  const date = new Date(milliseconds);
  if (date.toString() === "Invalid Date") return "";

  // Format the date and time
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  // const hours = String(date.getHours()).padStart(2, "0");
  // const minutes = String(date.getMinutes()).padStart(2, "0");
  // const seconds = String(date.getSeconds()).padStart(2, "0");

  // return `${day}-${month}-${year} ${hours}:${minutes}`;
  return `${year}-${month}-${day}`;
};

// export const buildQueryString = (params: QueryParams): string => {
//   const query = Object.entries(params)
//     .filter(([, value]) => value !== undefined)
//     .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
//     .join('&');

//   return query ? `?${query}` : '';
// };

export const formatDateFromTimestamp = (unixTimestamp: string) => {
  if (!unixTimestamp) return "NA";
  const date = new Date(parseFloat(unixTimestamp) * 1000);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const dayWithSuffix = day + getOrdinalSuffix(day);

  return `${dayWithSuffix} ${month}, ${year}`;
};

export const pluralize = (word: string, no: number = 0) => {
  if (no === 0 || no > 1) return `${word}s`;
  return word;
};



export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let timer: NodeJS.Timeout;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export function formatNumberWithCommas(number: number) {
  return number.toLocaleString();
}

export const convertEnumToDropdownItem = (enumObject: Record<string, string | number>) => {
  const items = Object.entries(enumObject)
    .filter(([, value]) => typeof value === "number")
    .map(([key, value]) => ({
      name: camelCaseToSpaceSeparated(key),
      id: value.toString(),
    }));
  return items;
};

export function removePathSegment(pathname: string, segmentToRemove: string): string {
  return pathname.replace(segmentToRemove, "");
}

export function convertTo12HourFormat(time: string) {
  const [hour, minute] = time.split(":");

  // Convert hour to a number to determine AM or PM
  let hourNumber = parseInt(hour, 10);
  const isPM = hourNumber >= 12;

  // Adjust hour to 12-hour format
  hourNumber = hourNumber % 12 || 12; // Convert 0 to 12 for midnight

  // Format the hour and minute
  const formattedTime = `${hourNumber}:${minute} ${isPM ? "PM" : "AM"}`;

  return formattedTime;
}

export const camelCaseToSpaceSeparated = (str: string) => {
  return (
    str
      // Insert a space before all capital letters
      .replace(/([A-Z])/g, " $1")
      // Remove the leading space if it exists
      .replace(/^ /, "")
  );
};

export const formatUnixTimestamp = (timestamp: number | string): string => {
  const date = new Date(Number(timestamp) * 1000); // Convert to milliseconds
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};
