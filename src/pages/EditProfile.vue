<template>
  <q-page class="items-center justify-evenly j-np-frame">
    <div>
      <q-icon class="j-np-icon" name="person_add" />
      <p class="j-np-title">Editar mi perfil</p>
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

          <q-input
            square
            clearable
            v-model="password"
            :type="passwordFieldType"
            label="Contraseña"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="visibilityIcon"
                @click="switchVisibility"
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <q-input
            square
            clearable
            v-model="repassword"
            :type="passwordFieldType"
            label="Repetir Contraseña"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="visibilityIcon"
                @click="switchVisibility"
                class="cursor-pointer"
              />
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
        @click="onSubmit(this.profile)"
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
  </q-page>
</template>

<script>
import { Notify } from "quasar";

export default {
  name: "EditProfilePage",
  data() {
    return {
      name: null,
      lastName: null,
      email: null,
      password: null,
      repassword: null,
      roles: ["AUTHOR"],
      passwordFieldType: "password",
      visibility: false,
      visibilityIcon: "visibility",
      loading_action: false,
    };
  },
  methods: {
    loadData() {
      this.name = this.profile.name;
      this.lastName = this.profile.lastName;
      this.email = this.profile.email;
    },
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    },
    onSubmit(patient) {
      this.loading_action = true;
      if (this.password == this.repassword) {
        this.$store
          .dispatch("auth/editProfile", {
            name: this.name,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            roles: this.roles,
          })
          .then(async () => {
            this.loading_action = false;
            this.$router.push({ name: "pacientes" });
          })
          .catch((error) => {
            this.loading_action = false;
            console.log(error);
          });
      } else {
        this.loading_action = false;
        Notify.create({
          color: "negative",
          position: "top",
          message: "Las contraseñas no coinciden",
          icon: "report_problem",
        });
      }
    },
    cancel() {
      this.$router.push({ name: "profile" });
    },
  },
  computed: {
    profile: {
      get() {
        return this.$store.getters["auth/profile"];
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
