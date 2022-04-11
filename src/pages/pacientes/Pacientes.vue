<template>
  <q-page class="row justify-evenly j-page">
    <div class="j-main-page">
      <PatientsList :pacientes="pacientes"></PatientsList>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import PatientsList from "src/components/PatientsList.vue";

export default defineComponent({
  name: "PacientesPage",
  components: { PatientsList },
  data() {
    return {
      pacientes: [],
    };
  },
  methods: {
    loadData() {
      this.$store.dispatch("pacientes/getPacientes").then((response) => {
        this.pacientes = response.data.pacientes;
      });
    },
  },
  mounted() {
    this.loadData();
  },
});
</script>

<style>
.j-main-page {
  width: -webkit-fill-available;
}
.j-page {
}
</style>
