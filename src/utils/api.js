import axios from "axios";
const api = (token, cancelToken, isHandlerDisabled) => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URI,
    headers:
      typeof token === "string" ? { Authorization: `Bearer ${token}` } : {},
    withCredentials: true,
  });
  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      if (
        response.data.status === "failed" ||
        response.data.status === "error"
      ) {
        let error;
        if (
          typeof response.data.message !== "string" &&
          Object.values(response.data.message).length
        ) {
          error = Object.values(response.data.message).join(", ");
        } else {
          error = response.data.message;
        }
        if (
          typeof response.data.error !== "string" &&
          Object.values(response.data.error).length
        ) {
          error = Object.values(response.data.error).join(", ");
        } else {
          error = response.data.error;
        }
        return Promise.reject(error);
      }
      return response.data;
    },
    (_error) => {
      //console.log("error>", _error);
    }
  );

  return axiosInstance;
};
export default api;
