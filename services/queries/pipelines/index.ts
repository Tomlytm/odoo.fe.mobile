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
