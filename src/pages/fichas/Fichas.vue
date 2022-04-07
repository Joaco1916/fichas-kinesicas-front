<template>
  <q-page class="row justify-evenly j-page">
    <div class="j-main-page">
      <FichasList :fichas="fichas"></FichasList>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import FichasList from "src/components/FichasList.vue";

export default defineComponent({
  name: "FichasPage",
  components: { FichasList },
  data() {
    return {};
  },
  computed: {
    fichas: {
      get() {
        const all_fichas = this.$store.getters["fichas/fichas"];
        const pa = this.$store.getters["pacientes/pacienteActual"];
        return all_fichas.filter(
          (ficha) => ficha.author.email == `${pa.email}`
        );
      },
    },
    pacienteActual: {
      get() {
        return this.$store.getters["pacientes/pacienteActual"];
      },
    },
  },
  methods: {},
});
</script>

<style>
.j-main-page {
  width: -webkit-fill-available;
  /*align-self: baseline;*/
}
.j-page {
  /*border-bottom: 5px solid teal;*/
}
</style>
