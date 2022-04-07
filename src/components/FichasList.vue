<template>
  <div class="fichas-list">
    <q-btn
      unelevated
      size="lg"
      @click="goNewFicha()"
      style="background: #00bfad !important"
      class="full-width text-white nf-btn"
      icon="post_add"
      label="Ficha nueva"
    />

    <q-card v-if="fichas.length == 0" class="j-card">
      <div class="j-column">
        <q-icon name="content_paste_off" class="j-icon text-teal" />
        <div>
          <div class="j-title">Este paciente no tiene fichas creadas.</div>
        </div>
      </div>
    </q-card>

    <FichaMiniCard
      v-for="(ficha, index) in fichas"
      :key="index"
      :ficha="ficha"
      :index="index"
    ></FichaMiniCard>
  </div>
</template>

<script>
import FichaMiniCard from "components/FichaMiniCard.vue";

export default {
  props: ["fichas"],
  methods: {},
  components: {
    FichaMiniCard,
  },
  methods: {
    goNewFicha() {
      this.$router.push({ name: "fichas-new" });
    },
  },
};
</script>

<style>
.fichas-list {
  width: -webkit-fill-available;
}
.nf-btn {
  margin: 6px;
}
.nf-btn-icon {
  color: white;
}
</style>
