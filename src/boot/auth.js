import { axiosInstance } from "boot/axios";

export default ({ store, router, urlPath }) => {
  router.beforeEach((to, from, next) => {
    const authRequired = to.matched.some((record) => record.meta.requiresAuth);
    const signedIn = store.getters["auth/signedIn"];

    if (authRequired && !signedIn) {
      return next({ name: "login" });
    } else {
      next();
    }
  });

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error?.response?.status === 401) {
        if (urlPath.indexOf("login") === -1) {
          router.push({ name: "login" });
        }
      }

      return Promise.reject(error);
    }
  );
};
