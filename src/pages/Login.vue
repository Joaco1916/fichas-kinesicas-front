<template>
  <q-page
    class="window-height window-width row justify-center items-center"
    style="background: linear-gradient(#ffffff, #00bfad)"
  >
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width: 300px; height: 400px">
          <q-card-section style="background: #009688 !important">
            <h4 class="text-h5 text-white q-my-md">Fichas kinésicas</h4>
            <div
              class="absolute-bottom-right q-pr-md"
              style="transform: translateY(50%)"
            >
              <q-btn
                class="text-white"
                fab
                icon="add"
                style="background: #00bfad !important"
                @click="goToRegistration()"
              />
            </div>
          </q-card-section>
          <q-card-section>
            <q-form class="q-px-sm q-pt-xl">
              <q-input
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
                square
                clearable
                v-model="password"
                type="password"
                label="Password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
              </q-input>
            </q-form>
          </q-card-section>

          <q-card-actions class="q-px-lg">
            <q-btn
              unelevated
              size="lg"
              style="background: #00bfad !important"
              class="full-width text-white"
              label="Entrar"
              type="submit"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p class="text-grey-6">¿Olvidaste tu contraseña?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "LoginPage",
  components: {},

  computed: {},

  data() {
    return {
      destinationRoutePath: "/",
      email: "",
      password: "",
    };
  },

  methods: {
    onSubmit() {
      this.$store
        .dispatch("auth/signIn", {
          email: this.email,
          password: this.password,
        })
        .then(async () => {
          this.$router.push({ name: "pacientes" });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onReset() {
      this.email = "";
      this.password = "";
    },
  },
});
</script>
