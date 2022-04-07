<template>
  <q-card class="j-card">
    <div class="j-column">
      <q-icon name="assignment" class="j-icon text-teal" />
      <div>
        <div class="j-title">{{ fichaFormmated }}</div>
      </div>
    </div>
    <div class="j-column">
      <button
        class="j-btn-fichas"
        clickable
        tag="a"
        target="_self"
        @click="fichaDetails(ficha.id)"
      >
        <q-icon name="chevron_right" class="j-icon-mini text-teal" />
      </button>
    </div>
  </q-card>
</template>

<script>
export default {
  props: ["ficha", "index"],
  methods: {
    fichaDetails(ficha_id) {
      this.$store.commit("fichas/updateFicha", this.ficha);
      this.$router.push({
        name: "fichas-details",
        params: {
          id: ficha_id,
        },
      });
    },
  },
  computed: {
    fichaFormmated: {
      get() {
        let formattedDate = new Date(this.ficha.createdAt);
        let meses = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ];
        return `#${this.index + 1} - ${formattedDate.getDate()} de ${
          meses[formattedDate.getMonth()]
        } de ${formattedDate.getFullYear()}`;
      },
    },
  },
};
</script>

<style>
.j-card {
  display: flex;
  padding: 5px 20px;
  margin: 5px 0px;
  width: 100%;
  justify-content: space-between;
}
.j-column {
  display: flex;
  align-items: center;
}
.j-title {
  font-weight: 600;
  font-size: 300;
  margin: 2px 5px;
}
.j-subtitle {
  font-size: 50;
  margin: 2px 5px;
}
.j-icon {
  font-size: 64px;
}
.j-icon-mini {
  font-size: 32px;
}
.j-btn-fichas {
  margin: 4px;
  border-radius: 100%;
  border: 1px solid teal;
  height: 70%;
  background: transparent;
}
</style>
