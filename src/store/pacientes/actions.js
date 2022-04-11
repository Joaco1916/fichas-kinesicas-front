import { axiosInstance } from "boot/axios";
import { Notify } from "quasar";

export function getPacientes({ commit }) {
  return new Promise((resolve, reject) => {
    const url = `pacientes`;
    axiosInstance
      .get(url)
      .then((response) => {
        commit("updatePacientes", response.data);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getPaciente({ commit }, id) {
  return new Promise((resolve, reject) => {
    const url = `pacientes/${id}`;
    axiosInstance
      .get(url)
      .then((response) => {
        commit("updatePaciente", response.data);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function createPaciente({ commit }, credentials) {
  let new_credentials = credentials;
  if (
    !new_credentials.email.includes("@") ||
    !new_credentials.email.includes(".com")
  )
    new_credentials.email = null;
  if (!isNaN(new_credentials.telefono) && new_credentials.telefono.length >= 6)
    new_credentials.telefono = parseInt(new_credentials.telefono, 10);
  if (!isNaN(new_credentials.nroCalle))
    new_credentials.nroCalle = parseInt(new_credentials.nroCalle, 10);
  return new Promise((resolve, reject) => {
    const url = "pacientes";
    axiosInstance
      .post(url, new_credentials)
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

export function editPaciente({ commit }, data) {
  let new_credentials = data.credentials;
  let format_error = false;
  let error_msg = "";
  if (new_credentials.name == "" || new_credentials.name == null) {
    new_credentials.name = null;
    format_error = true;
    error_msg = "No ingresaste un nombre válido.";
  }
  if (new_credentials.lastName == "" || new_credentials.lastName == null) {
    new_credentials.lastName = null;
    format_error = true;
    error_msg = "No ingresaste un apellido válido.";
  }
  if (
    new_credentials.email == "" ||
    new_credentials.email == null ||
    !new_credentials.email.includes("@") ||
    !new_credentials.email.includes(".com")
  ) {
    new_credentials.email = null;
    format_error = true;
    error_msg = "No ingresaste un email válido.";
  }
  if (new_credentials.calle == "" || new_credentials.calle == null) {
    new_credentials.calle = null;
    format_error = true;
    error_msg = "No ingresaste una calle válida.";
  }
  if (
    !isNaN(new_credentials.telefono) &&
    new_credentials.telefono.toString().length >= 6
  ) {
    new_credentials.telefono = parseInt(new_credentials.telefono, 10);
  } else {
    format_error = true;
    error_msg = "No ingresaste un teléfono válido.";
  }
  if (
    new_credentials.nroCalle != null &&
    new_credentials.nroCalle != "" &&
    !isNaN(new_credentials.nroCalle)
  ) {
    new_credentials.nroCalle = parseInt(new_credentials.nroCalle, 10);
  } else {
    format_error = true;
    error_msg = "No ingresaste un número de calle válido.";
  }
  if (!format_error) {
    return new Promise((resolve, reject) => {
      const url = `pacientes/${data.patient.id}`;
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
  } else {
    Notify.create({
      color: "warning",
      position: "top",
      message: error_msg,
      icon: "report_problem",
    });
  }
}

export function deletePaciente({ commit }, data) {
  return new Promise((resolve, reject) => {
    const url = `pacientes/${data.patient.id}`;
    axiosInstance
      .delete(url)
      .then((response) => {
        commit("updatePaciente", null);

        Notify.create({
          color: "positive",
          position: "top",
          message: "El paciente se eliminó exitosamente",
          icon: "person_remove",
        });

        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
