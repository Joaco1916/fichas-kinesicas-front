<template>
  <q-page class="items-center justify-evenly j-np-frame">
    <div>
      <q-icon class="j-np-icon" name="person_add" />
      <p class="j-np-title">Nuevo paciente</p>
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
        @click="onSubmit()"
        style="background: #00bfad !important"
        class="full-width text-white"
        label="Crear"
        ><q-spinner
          v-if="loading_action"
          color="primary"
          size="20px"
          class="j-btnSpinner"
      /></q-btn>
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
  </q-page>
</template>

<script>
import { Notify } from "quasar";
export default {
  name: "NewPacientePage",
  data() {
    return {
      name: "",
      lastName: "",
      email: "",
      telefono: "",
      calle: "",
      nroCalle: "",
      loading_action: false,
    };
  },
  methods: {
    onSubmit() {
      this.loading_action = true;
      this.$store
        .dispatch("pacientes/createPaciente", {
          name: this.name,
          lastName: this.lastName,
          email: this.email,
          telefono: this.telefono,
          calle: this.calle,
          nroCalle: this.nroCalle,
        })
        .then(async () => {
          this.loading_action = false;
          this.$router.push({ name: "pacientes" });
        })
        .catch((error) => {
          Notify.create({
            color: "negative",
            position: "top",
            message: "Falló la creación del paciente",
            icon: "report",
          });
          this.loading_action = false;
        });
    },
    cancel() {
      this.$router.push({ name: "pacientes" });
    },
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
