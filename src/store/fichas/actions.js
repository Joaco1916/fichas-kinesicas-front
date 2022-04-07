import { axiosInstance } from "boot/axios";
import { Notify } from "quasar";

export function getFichas({ commit }) {
  return new Promise((resolve, reject) => {
    const url = `ficha`;
    axiosInstance
      .get(url)
      .then((response) => {
        commit("updateFichas", response.data.fichas);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function createFicha({ commit }, data) {
  let new_credentials = data.credential;

  //controls
  if (!isNaN(new_credentials.edad))
    new_credentials.edad = parseInt(new_credentials.edad, 10);
  if (new_credentials.antecedentes == null)
    new_credentials.antecedentes = "Ninguno";
  if (new_credentials.irradiacion == null)
    new_credentials.irradiacion = "Ninguna";
  if (new_credentials.atenuacion_agravacion == null)
    new_credentials.atenuacion_agravacion = "Ninguna";
  if (new_credentials.estudios_complementarios == null)
    new_credentials.estudios_complementarios = "Ninguno";
  if (new_credentials.observaciones == null)
    new_credentials.observaciones = "Ninguna";

  //formatting
  new_credentials.marcapasos = new_credentials.marcapasos == "true";
  new_credentials.audifonos = new_credentials.audifonos == "true";
  new_credentials.embarazo = new_credentials.embarazo == "true";
  new_credentials.protesis = new_credentials.protesis == "true";
  return new Promise((resolve, reject) => {
    const url = `ficha/${data.patient.id}`;
    axiosInstance
      .post(url, new_credentials)
      .then((response) => {
        Notify.create({
          color: "positive",
          position: "top",
          message: response.data.message,
          icon: "inventory",
        });

        resolve(response);
      })
      .catch((error) => {
        error.response.data.message.forEach((msg) => {
          let trans_msg;
          let show = false;
          switch (msg) {
            case "ocupacion must be a string":
              trans_msg = "Ingresá una ocupación válido.";
              show = true;
              break;
            case "diagnostico must be a string":
              trans_msg = "Ingresá un diagnostico válido.";
              show = true;
              break;
            case "edad must be a number conforming to the specified constraints":
              trans_msg = "Ingresá una edad válida.";
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

export function editFicha({ commit }, data) {
  let new_credentials = data.credential;

  //controls
  if (!isNaN(new_credentials.edad))
    new_credentials.edad = parseInt(new_credentials.edad, 10);
  if (new_credentials.antecedentes == null)
    new_credentials.antecedentes = "Ninguno";
  if (new_credentials.irradiacion == null)
    new_credentials.irradiacion = "Ninguna";
  if (new_credentials.atenuacion_agravacion == null)
    new_credentials.atenuacion_agravacion = "Ninguna";
  if (new_credentials.estudios_complementarios == null)
    new_credentials.estudios_complementarios = "Ninguno";
  if (new_credentials.observaciones == null)
    new_credentials.observaciones = "Ninguna";

  //formatting
  new_credentials.marcapasos = new_credentials.marcapasos == "true";
  new_credentials.audifonos = new_credentials.audifonos == "true";
  new_credentials.embarazo = new_credentials.embarazo == "true";
  new_credentials.protesis = new_credentials.protesis == "true";
  return new Promise((resolve, reject) => {
    const url = `ficha/${data.ficha.id}`;
    axiosInstance
      .put(url, new_credentials)
      .then((response) => {
        Notify.create({
          color: "positive",
          position: "top",
          message: "Ficha editada exitosamente",
          icon: "inventory",
        });

        resolve(response);
      })
      .catch((error) => {
        error.response.data.message.forEach((msg) => {
          let trans_msg;
          let show = false;
          switch (msg) {
            case "ocupacion must be a string":
              trans_msg = "Ingresá una ocupación válido.";
              show = true;
              break;
            case "diagnostico must be a string":
              trans_msg = "Ingresá un diagnostico válido.";
              show = true;
              break;
            case "edad must be a number conforming to the specified constraints":
              trans_msg = "Ingresá una edad válida.";
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

export function deleteFicha({ commit }, data) {
  return new Promise((resolve, reject) => {
    const url = `ficha/${data.ficha.id}`;
    axiosInstance
      .delete(url)
      .then((response) => {
        commit("updateFicha", null);

        Notify.create({
          color: "positive",
          position: "top",
          message: "La ficha se eliminó exitosamente",
          icon: "folder_delete",
        });

        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
