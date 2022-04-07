<template>
  <q-page class="row items-center justify-evenly j-page">
    <div class="j-main-page">
      <q-btn></q-btn>
      <PatientsList :pacientes="pacientes"></PatientsList>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import PatientsList from "src/components/PatientsList.vue";

export default defineComponent({
  name: "IndexPage",
  components: { PatientsList },
  computed: {
    pacientes() {
      return this.$store.getters["pacientes/pacientes"];
    },
  },
  setup() {},
});
</script>

<style>
.j-main-page {
  width: -webkit-fill-available;
}
.j-page {
}
</style>
