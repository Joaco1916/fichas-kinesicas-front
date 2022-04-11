<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <q-page
        class="window-height window-width row justify-center items-center"
        style="background: linear-gradient(#ffffff, #00bfad)"
      >
        <div class="column q-pa-lg">
          <div class="row">
            <q-card square class="shadow-24">
              <q-card-section style="background: #009688 !important">
                <h4 class="text-h5 text-white q-my-md">{{ title }}</h4>
              </q-card-section>
              <q-card-section>
                <q-fab
                  @click="switchTypeForm"
                  icon="add"
                  class="absolute text-white"
                  style="
                    top: 0;
                    right: 12px;
                    transform: translateY(-50%);
                    background: #00bfad !important;
                  "
                >
                  <q-tooltip>Registración</q-tooltip>
                </q-fab>
                <q-form class="q-px-sm q-pt-xl">
                  <q-input
                    ref="email"
                    square
                    clearable
                    v-model="email"
                    type="email"
                    label="Email"
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input
                    ref="username"
                    v-if="register"
                    square
                    clearable
                    v-model="username"
                    type="username"
                    label="Nombre"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input
                    ref="lastname"
                    v-if="register"
                    square
                    clearable
                    v-model="lastname"
                    type="lastname"
                    label="Apellido"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input>
                  <q-input
                    ref="password"
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
                    ref="repassword"
                    v-if="register"
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
              <q-card-actions class="q-px-lg">
                <q-btn
                  :disable="loading_action"
                  unelevated
                  size="lg"
                  @click="submit"
                  style="background: #00bfad !important"
                  class="full-width text-white"
                  :label="btnLabel"
                >
                  <q-spinner
                    v-if="loading_action"
                    color="primary"
                    size="20px"
                    class="j-btnSpinner"
                  />
                </q-btn>
              </q-card-actions>
              <!--<q-card-section v-if="!register" class="text-center q-pa-sm">
                <p class="text-grey-6">¿Olvidaste tu contraseña?</p>
              </q-card-section>-->
              <q-card-section v-if="register" class="text-center q-pa-sm">
                <p class="text-grey-6"></p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage, Notify } from "quasar";

export default {
  name: "LoginLayout",
  data() {
    return {
      title: "Fichas kinésicas",
      email: "",
      username: "",
      lastname: "",
      password: "",
      repassword: "",
      register: false,
      passwordFieldType: "password",
      btnLabel: "Entrar",
      visibility: false,
      visibilityIcon: "visibility",
      loading_action: false,
    };
  },

  methods: {
    reset() {
      this.email = "";
      this.password = "";
      this.repassword = "";
      this.username = "";
      this.lastname = "";
    },

    submit() {
      this.loading_action = true;
      //Registro y login
      if (this.register) {
        if (this.password == this.repassword) {
          const newparams = {
            name: this.username,
            lastName: this.lastname,
            email: this.email,
            password: this.password,
            repassword: this.repassword,
          };

          this.$store
            .dispatch("auth/register", newparams)
            .then((response) => {
              this.$store
                .dispatch("auth/signIn", {
                  email: this.email,
                  password: this.password,
                })
                .then(async () => {
                  this.loading_action = false;
                  this.$router.push({ name: "pacientes" });
                })
                .catch((error) => {
                  this.loading_action = false;
                  this.reset();
                });
            })
            .catch((error) => {
              this.loading_action = false;
              this.reset();
            });
        } else {
          this.password = "";
          this.repassword = "";
          Notify.create({
            color: "negative",
            position: "top",
            message: "Las contraseñas no coinciden.",
            icon: "report",
          });
          this.loading_action = false;
        }
      }
      //Login
      else {
        this.$store
          .dispatch("auth/signIn", {
            email: this.email,
            password: this.password,
          })
          .then(async () => {
            this.loading_action = false;
            this.$router.push({ name: "pacientes" });
          })
          .catch((error) => {
            this.loading_action = false;
            this.reset();
          });
      }
    },

    switchTypeForm() {
      this.register = !this.register;
      this.title = this.register ? "Fichas kinésicas" : "Fichas kinésicas";
      this.btnLabel = this.register ? "Registrarse" : "Entrar";
    },
    switchVisibility() {
      this.visibility = !this.visibility;
      this.passwordFieldType = this.visibility ? "text" : "password";
      this.visibilityIcon = this.visibility ? "visibility_off" : "visibility";
    },

    loadData() {
      if (LocalStorage.has("token")) {
        this.$router.push({ name: "pacientes" });
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style>
.j-btnSpinner {
  margin-left: 6px;
}
</style>
