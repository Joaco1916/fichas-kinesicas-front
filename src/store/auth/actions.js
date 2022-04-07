import { axiosInstance } from "boot/axios";
import { Notify, LocalStorage } from "quasar";

export function signIn({ commit }, credentials) {
  return new Promise((resolve, reject) => {
    const url = "auth/login";
    axiosInstance
      .post(url, credentials)
      .then((response) => {
        Notify.create({
          color: "positive",
          position: "top",
          message: response.data.message,
          icon: "login",
        });

        try {
          LocalStorage.set("token", response.data.data.accessToken);
          LocalStorage.set("token_type", "Bearer");
        } catch (e) {}
        commit("signIn", response.data.data.accessToken);
        commit("updateProfile", response.data.data.user);

        setAxiosHeaders(response.data.data.accessToken);

        resolve(response);
      })
      .catch((error) => {
        Notify.create({
          color: "negative",
          position: "top",
          message:
            error.response.data.message == "Unauthorized"
              ? "El email o la contraseña no fue completado"
              : error.response.data.message,
          icon: "report_problem",
        });

        reject(error);
      });
  });
}

export function register({ commit }, credentials) {
  return new Promise((resolve, reject) => {
    const url = "user/register";
    axiosInstance
      .post(url, credentials)
      .then((response) => {
        Notify.create({
          color: "positive",
          position: "top",
          message: response.data.message,
          icon: "how_to_reg",
        });

        resolve(response);
      })
      .catch((error) => {
        console.log(error.response.data);
        let trans_msg;
        let show = false;
        if (
          error.response.data.message ==
          "Este email ya tiene una cuenta creada."
        ) {
          Notify.create({
            color: "negative",
            position: "top",
            message: trans_msg,
            icon: "report_problem",
          });
        }
        if (error.response.data.message.length > 1) {
          error.response.data.message.forEach((msg) => {
            switch (msg) {
              case "Este email ya tiene una cuenta creada.":
                trans_msg = "Este email ya tiene una cuenta creada.";
                show = true;
                break;
              case "lastName must be a string":
                trans_msg = "Ingresá un apellido válido.";
                show = true;
                break;
              case "email must be an email":
                trans_msg = "Ingresá un email válido.";
                show = true;
                break;
              case "password must be longer than or equal to 8 characters":
                trans_msg = "La contraseña debe tener al menos 8 caracteres";
                show = true;
                break;
            }
          });
        }

        if (show) {
          Notify.create({
            color: "negative",
            position: "top",
            message: trans_msg,
            icon: "report_problem",
          });
        }

        reject(error);
      });
  });
}

export async function signOut({ commit }) {
  try {
    LocalStorage.remove("token");
    LocalStorage.remove("token_type");
  } catch (e) {}

  commit("signOut");

  deleteAxiosHeaders();
}

export function getProfile({ commit }) {
  return new Promise((resolve, reject) => {
    const url = "auth/profile";
    axiosInstance
      .get(url)
      .then((response) => {
        commit("updateProfile", response.data.user);
        resolve(response);
      })
      .catch((error) => {
        console.log("error profile", error);
        reject(error);
      });
  });
}

export function editProfile({ commit }, data) {
  let new_credentials = data;
  if (
    !new_credentials.email.includes("@") ||
    !new_credentials.email.includes(".com")
  )
    new_credentials.email = null;

  return new Promise((resolve, reject) => {
    const url = `user`;
    axiosInstance
      .put(url, new_credentials)
      .then((response) => {
        Notify.create({
          color: "positive",
          position: "top",
          message: response.data.message,
          icon: "how_to_reg",
        });

        resolve(response);
      })
      .catch((error) => {
        /*if (show) {
          Notify.create({
            color: "negative",
            position: "top",
            message: error.response.data.message,
            icon: "report_problem",
          });
        }*/
        error.response.data.message.forEach((msg) => {
          let trans_msg;
          let show = false;
          switch (msg) {
            case "name must be a string":
              trans_msg = "Ingresá un nombre válido.";
              show = true;
              break;
            case "lastName must be a string":
              trans_msg = "Ingresá un apellido válido.";
              show = true;
              break;
            case "email must be a string":
              trans_msg = "Ingresá un email válido.";
              show = true;
              break;
            case "email must be an email":
              trans_msg = "Ingresá un email válido.";
              show = true;
              break;
            case "telefono must be a number conforming to the specified constraints":
              trans_msg = "Ingresá un teléfono válido.";
              show = true;
              break;
            case "calle must be a string":
              trans_msg = "Ingresá una calle válido.";
              show = true;
              break;
            case "nroCalle must be a number conforming to the specified constraints":
              trans_msg = "Ingresá un número de calle válido.";
              show = true;
              break;
          }
          if (show) {
            Notify.create({
              color: "negative",
              position: "top",
              message: trans_msg,
              icon: "report_problem",
            });
          }
        });
        reject(error);
      });
  });
}

function setAxiosHeaders(token) {
  axiosInstance.defaults.headers.common.Authorization = "Bearer " + token;
}

function deleteAxiosHeaders() {
  delete axiosInstance.defaults.headers.common.Authorization;
}
