const BASE_URL = "/api/v1/";

const createRoute = (path: string) => `${BASE_URL}${path}`;
// const createDynamicRoute = (path: string) => (id: string | string[]) =>
//   `${BASE_URL}${path.replace(":id", id.toString())}`;

export const apiRoutes = {
  auth: {
    login: createRoute("auth/login"),
    refresh: createRoute("Account/refresh-token"),
  },
  pipelines: {
    get: createRoute("pipelines"),
  },
  activityTypes: {
    get: createRoute("pipelines/activities/types"),
  },
};
