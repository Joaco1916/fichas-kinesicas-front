import { boot } from "quasar/wrappers";
import axios from "axios";
import { LocalStorage } from "quasar";

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const axiosInstance = axios.create({
  //baseURL: "https://api.example.com",
  //baseURL: "http://localhost:3000/",
  baseURL: process.env.API_URL,
});

const accessToken = LocalStorage.has("token")
  ? LocalStorage.getItem("token")
  : false;

const tokenType = LocalStorage.has("token_type")
  ? LocalStorage.getItem("token_type")
  : "Bearer";

if (accessToken) {
  axiosInstance.defaults.headers.common.Authorization = `${tokenType} ${accessToken}`;
}

axiosInstance.defaults.headers.common.from_app = true;

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axiosInstance;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  // app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { axiosInstance };
