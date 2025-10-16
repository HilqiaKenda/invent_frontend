import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export interface ApiError {
  message: string;
  status: number;
  data?: any;
}

export const handleApiError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message ||
      "An unexpected error occurred";

    return {
      message,
      status,
      data: error.response?.data,
    };
  }

  return {
    message: "An unexpected error occurred",
    status: 500,
  };
};

export const showErrorToast = (error: unknown) => {
  const apiError = handleApiError(error);

  toast.error(apiError.message);
};
