<template>
  <q-card class="j-card">
    <div class="j-column">
      <q-icon name="account_circle" class="j-icon text-teal" />
      <div>
        <div class="j-title">{{ patient.name }} {{ patient.lastName }}</div>
      </div>
    </div>
    <div class="j-column">
      <button
        class="j-btn-patient"
        clickable
        tag="a"
        target="_self"
        @click="pacientesDetails(patient.id)"
      >
        <q-icon name="badge" class="j-icon-mini text-teal" />
      </button>
      <button class="j-btn-patient" @click="loadFichas(patient.id)">
        <q-icon name="folder_shared" class="j-icon-mini text-teal" />
      </button>
    </div>
  </q-card>
</template>

<script>
export default {
  props: ["patient", "index"],
  methods: {
    pacientesDetails(patient_id) {
      this.$store.commit("pacientes/updatePaciente", this.patient);
      this.$router.push({
        name: "pacientes-details",
        params: {
          id: patient_id,
        },
      });
    },
    loadFichas(patient_id) {
      this.$store.commit("pacientes/updatePaciente", this.patient);
      this.$store
        .dispatch("fichas/getFichas")
        .then((response) => {
          this.$router.push({
            name: "fichas",
          });
        })
        .catch((error) => {
          console.log(error);
        });
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
.j-btn-patient {
  margin: 4px;
  border-radius: 100%;
  border: 1px solid teal;
  height: 70%;
  background: transparent;
}
</style>
