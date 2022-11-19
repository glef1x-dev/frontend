import axios from "axios";

export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: BASE_API_URL,
});
