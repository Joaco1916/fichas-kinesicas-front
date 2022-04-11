<template>
  <q-page class="items-center justify-evenly j-np-frame">
    <div>
      <q-icon class="j-np-icon" name="person_add" />
      <p class="j-np-title">Editar paciente</p>
    </div>
    <q-card class="j-np-card-1">
      <q-card-section>
        <q-form class="q-px-sm">
          <q-input square clearable v-model="name" label="Nombre">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input square clearable v-model="lastName" label="Apellido">
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input square clearable v-model="email" label="Email">
            <template v-slot:prepend>
              <q-icon name="email" />
            </template>
          </q-input>

          <q-input square clearable v-model="telefono" label="Teléfono">
            <template v-slot:prepend>
              <q-icon name="phone" />
            </template>
          </q-input>

          <q-input square clearable v-model="calle" label="Calle">
            <template v-slot:prepend>
              <q-icon name="signpost" />
            </template>
          </q-input>

          <q-input square clearable v-model="nroCalle" label="Número">
            <template v-slot:prepend>
              <q-icon name="signpost" />
            </template>
          </q-input>
        </q-form>
      </q-card-section>
    </q-card>
    <q-card-actions class="q-px-lg j-np-button">
      <q-btn
        unelevated
        :disable="loading_action"
        size="lg"
        @click="onSubmit(this.pacienteActual)"
        style="background: #00bfad !important"
        class="full-width text-white"
        label="Guardar"
      >
        <q-spinner
          v-if="loading_action"
          color="primary"
          size="20px"
          class="j-btnSpinner"
        />
      </q-btn>
    </q-card-actions>
    <q-card-actions class="q-px-lg">
      <q-btn
        unelevated
        size="lg"
        @click="cancel()"
        style="background: #00bfad !important"
        class="full-width text-white"
        label="Cancelar"
      />
    </q-card-actions>
    <q-card-actions class="q-px-lg">
      <q-btn
        unelevated
        :disable="loading_action"
        size="lg"
        @click="deletePatient(this.pacienteActual)"
        style="background: red !important"
        class="full-width text-white"
        label="Eliminar"
      >
        <q-spinner
          v-if="loading_action"
          color="primary"
          size="20px"
          class="j-btnSpinner"
        />
      </q-btn>
    </q-card-actions>
  </q-page>
</template>

<script>
import { Notify } from "quasar";
export default {
  name: "EditPacientePage",
  data() {
    return {
      name: null,
      lastName: null,
      email: null,
      telefono: null,
      calle: null,
      nroCalle: null,
      loading_action: false,
    };
  },
  methods: {
    loadData() {
      this.name = this.pacienteActual.name;
      this.lastName = this.pacienteActual.lastName;
      this.email = this.pacienteActual.email;
      this.telefono = this.pacienteActual.telefono;
      this.calle = this.pacienteActual.calle;
      this.nroCalle = this.pacienteActual.nroCalle;
    },
    onSubmit(patient) {
      this.loading_action = true;
      this.$store
        .dispatch("pacientes/editPaciente", {
          patient: patient,
          credentials: {
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            telefono: this.telefono,
            calle: this.calle,
            nroCalle: this.nroCalle,
          },
        })
        .then(async () => {
          this.loading_action = false;
          this.$router.push({ name: "pacientes" });
        })
        .catch((error) => {
          this.loading_action = false;
          Notify.create({
            color: "negative",
            position: "top",
            message: "Falló la edición del paciente",
            icon: "report",
          });
          //this.$router.push({ name: "pacientes" });
        });
    },
    cancel() {
      this.$router.push({ name: "pacientes" });
    },
    deletePatient(patient) {
      this.loading_action = true;
      this.$store
        .dispatch("pacientes/deletePaciente", { patient: patient })
        .then(async () => {
          this.loading_action = false;
          this.$router.push({ name: "pacientes" });
        })
        .catch((error) => {
          let error_msg =
            error.response.data.statusCode == 500
              ? "El paciente tiene fichas asociadas, eliminalas primero"
              : "Falló la eliminación del paciente";
          Notify.create({
            color: "negative",
            position: "top",
            message: error_msg,
            icon: "report",
          });
          this.loading_action = false;
        });
    },
  },
  computed: {
    pacienteActual: {
      get() {
        return this.$store.getters["pacientes/pacienteActual"];
      },
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style>
.j-np-frame {
  padding: 20px;
}
.j-np-title {
  font-size: 1.5em;
  padding-left: 6px;
  padding-right: 6px;
  display: inline-flex;
}
.j-np-card-1 {
  width: -webkit-fill-available;
  padding-left: 6px;
  padding-right: 6px;
  padding-bottom: 6px;
  /*align-self: baseline;*/
}
.j-np-button {
  margin-top: 16px;
}
.j-np-icon {
  color: teal;
  font-size: 1.5em;
  margin-bottom: 8px;
  padding-left: 6px;
}
.j-btnSpinner {
  margin-left: 6px;
}
</style>
