<template>
  <div class="patient-list">
    <q-card v-if="pacientes.length == 0" class="j-card">
      <div class="j-column">
        <q-icon name="group_off" class="j-icon text-teal" />
        <div>
          <div class="j-title">
            No tenés ningún paciente ingresado por el momento.
          </div>
        </div>
      </div>
    </q-card>

    <PatientMiniCard
      v-for="(patient, index) in pacientes"
      :key="index"
      :patient="patient"
      :index="index"
    ></PatientMiniCard>
  </div>
</template>

<script>
import PatientMiniCard from "components/PatientMiniCard.vue";

export default {
  props: ["pacientes"],
  methods: {},
  components: {
    PatientMiniCard,
  },
};
</script>

<style>
.patient-list {
  width: -webkit-fill-available;
}
</style>
