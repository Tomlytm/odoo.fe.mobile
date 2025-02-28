import api from "@/services/api";
import { apiRoutes } from "@/services/api/api-routes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface Pipeline {
  id: number;
  name: string;
}

interface PipelineDataResponse {
  data: Pipeline[];
}
export const useGetPipelines = () => {
  const { isLoading, data, error, refetch } = useQuery<
    PipelineDataResponse,
    AxiosError
  >({
    queryKey: ["pipelines"],
    queryFn: async () => {
      return await api.get({
        url: apiRoutes.pipelines.get,
        token: true,
      });
    },
    refetchOnWindowFocus: false,
  });

  return {
    isDataLoading: isLoading,
    pipelinesData: data,
    error,
    refetch,
  };
};

export const useGetPipelineById = (id: number) => {
  const { isLoading, data, error, refetch } = useQuery<Pipeline, AxiosError>({
    queryKey: ["pipeline", id],
    queryFn: async () => {
      const response = await api.get({
        url: `${apiRoutes.pipelines.get}/${id}`,
        token: true,
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  return {
    isDataLoading: isLoading,
    pipelineData: data,
    error,
    refetch,
  };
};

export const useGetActivityByPipelineId = (pipelineId: number) => {
  const { isLoading, data, error, refetch } = useQuery<any, AxiosError>({
    queryKey: ["pipelineActivities", pipelineId],
    queryFn: async () => {
      const response = await api.get({
        url: `${apiRoutes.pipelines.get}/${pipelineId}/activities`,
        token: true,
      });
      return response;
    },
    refetchOnWindowFocus: false,
  });

  return {
    isDataLoading: isLoading,
    activitiesData: data,
    error,
    refetch,
  };
};

export const useGetActivityTypes = () => {
  const { isLoading, data, error, refetch } = useQuery<any, AxiosError>({
    queryKey: ["activityTypes"],
    queryFn: async () => {
      const response = await api.get({
        url: apiRoutes.activityTypes.get,
        token: true,
      });
      return response;
    },
    refetchOnWindowFocus: false,
  });

  return {
    isDataLoading: isLoading,
    activityTypesData: data,
    error,
    refetch,
  };
};
