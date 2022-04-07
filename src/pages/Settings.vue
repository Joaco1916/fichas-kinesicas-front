<template>
  <q-page class="items-center justify-evenly j-np-frame">
    <div>
      <q-icon class="j-np-icon" name="settings" />
      <p class="j-np-title">Configuraciones</p>
    </div>
    <q-card class="j-np-card-1">
      <q-card-section>
        <q-form class="q-px-sm">
          <q-toggle
            v-model="darkTheme"
            color="teal"
            label="Modo noche"
            @click="setMode()"
          />
        </q-form>
      </q-card-section>
    </q-card>

    <div>
      <q-icon class="j-np-icon" name="info" />
      <p class="j-np-title">Acerca de</p>
    </div>
    <q-card class="j-np-card-1">
      <q-card-section>
        <q-form class="q-px-sm">
          <p>
            {{
              "Esta aplicación es un proyecto final para la materia Ingeniería de Aplicaciones Web para la Universidad del Sur (Bahía Blanca, Buenos Aires, Argentina) creado por Joaquín Rodriguez (LU:108641)"
            }}
          </p>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { Dark } from "quasar";
export default {
  name: "SettingPage",
  data() {
    return {
      darkTheme: false,
    };
  },
  methods: {
    setMode() {
      Dark.set(this.darkTheme);
      console.log(Dark.mode);
      console.log(Dark.isActive);
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
  margin-top: 16px;
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
</style>
