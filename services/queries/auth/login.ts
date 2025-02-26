import api from "@/services/api";
import { apiRoutes } from "@/services/api/api-routes";
import appConfig from "@/services/app-config";
import { saveSecureStorage } from "@/services/formats"; // SecureStore helper
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/context/UserContext"; // Import UserContext

interface ILogin {
  email: string;
}

export const useLogin = (onSuccess?: () => void) => {
  const { setUser } = useUser(); // Get setUser from UserContext

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: ILogin) =>
      api.post({
        url: apiRoutes.auth.login,
        body: data,
        auth: false,
      }),
    onSuccess: async (response) => {
      if (response) {
        console.log("Login Success:", response?.payload);

        // Save Token
        await saveSecureStorage(appConfig.tokenKey, response?.payload?.token);

        // Save User Details
        const userData = response?.user;
        if (userData) {
          await saveSecureStorage(appConfig.userDetails, userData);
          setUser(userData); // Update Context
        }
      }
      onSuccess?.();
    },
    onError: (error) => {
      console.log("Login Error:", error);
    },
  });

  return {
    login: mutate,
    logging: isPending,
    loggedin: isSuccess,
  };
};
