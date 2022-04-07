<template>
  <q-page class="items-center justify-evenly j-np-frame">
    <div>
      <q-icon class="j-nf-icon-header" name="post_add" />
      <p class="j-np-header">Nueva ficha</p>
    </div>

    <q-card class="j-nf-card-1">
      <q-card-section>
        <div>
          <q-icon class="j-nf-icon-header" name="person" />
          <p class="j-np-title">Datos personales</p>
        </div>
        <q-form class="q-px-sm">
          <q-input square clearable v-model="edad" label="Edad">
            <template v-slot:prepend> </template>
          </q-input>

          <q-input square clearable v-model="ocupacion" label="Ocupación">
            <template v-slot:prepend> </template>
          </q-input>

          <q-input square clearable v-model="antecedentes" label="Antecedentes">
            <template v-slot:prepend> </template>
          </q-input>

          <q-card-section horizontal>
            <div class="col-6">
              <q-toggle v-model="marcapasos" color="teal" label="Marcapasos" />
              <q-toggle v-model="audifonos" color="teal" label="Audífonos" />
            </div>
            <div class="col-6">
              <q-toggle v-model="embarazo" color="teal" label="Embarazo" />
              <q-toggle v-model="protesis" color="teal" label="Prótesis" />
            </div>
          </q-card-section>
        </q-form>
      </q-card-section>
    </q-card>

    <q-card class="j-nf-card-1">
      <q-card-section>
        <div>
          <q-icon class="j-nf-icon-header" name="assignment" />
          <p class="j-np-title">Motivos de consulta</p>
        </div>
        <q-form class="q-px-sm">
          <q-input square clearable v-model="diagnostico" label="Diagnóstico">
            <template v-slot:prepend> </template>
          </q-input>

          <q-input
            square
            clearable
            v-model="medico_derivante"
            label="Médico derivante"
          >
            <template v-slot:prepend> </template>
          </q-input>

          <q-input
            square
            clearable
            v-model="estudios_complementarios"
            label="Estudios complementarios"
          >
            <template v-slot:prepend> </template>
          </q-input>
        </q-form>
      </q-card-section>
    </q-card>

    <q-card class="j-nf-card-1">
      <q-card-section>
        <div>
          <q-icon class="j-nf-icon-header" name="healing" />
          <p class="j-np-title">Dolor</p>
        </div>
        <q-form class="q-px-sm">
          <q-input
            square
            clearable
            v-model="mecanismo_de_lesion"
            label="Mecanismo de lesión"
          >
            <template v-slot:prepend> </template>
          </q-input>

          <q-input square clearable v-model="antiguedad" label="Antigüedad">
            <template v-slot:prepend> </template>
          </q-input>

          <q-input square clearable v-model="localizacion" label="Localización">
            <template v-slot:prepend> </template>
          </q-input>

          <q-input
            square
            clearable
            v-model="caracteristica"
            label="Característica"
          >
            <template v-slot:prepend> </template>
          </q-input>

          <q-input square clearable v-model="irradiacion" label="Irradiación">
            <template v-slot:prepend> </template>
          </q-input>

          <q-input
            square
            clearable
            v-model="atenuacion_agravacion"
            label="Atenuación/Agravación"
          >
            <template v-slot:prepend> </template>
          </q-input>
        </q-form>
      </q-card-section>
    </q-card>

    <q-card class="j-nf-card-1">
      <q-card-section>
        <div>
          <q-icon class="j-nf-icon-header" name="info" />
          <p class="j-np-title">Extra</p>
        </div>
        <q-form class="q-px-sm">
          <q-input square clearable v-model="observaciones" label="Observación">
            <template v-slot:prepend> </template>
          </q-input>
        </q-form>
      </q-card-section>
    </q-card>

    <q-card-actions class="q-px-lg j-np-button">
      <q-btn
        unelevated
        size="lg"
        @click="onSubmit(this.pacienteActual)"
        style="background: #00bfad !important"
        class="full-width text-white"
        label="Crear"
      />
    </q-card-actions>
    <q-card-actions class="q-px-lg">
      <q-btn
        unelevated
        size="lg"
        @click="cancel()"
        style="background: #00bfad !important"
        class="full-width text-white"
        label="Cancelar"
      />
    </q-card-actions>
  </q-page>
</template>

<script>
import { Notify } from "quasar";
export default {
  name: "NewFichaPage",
  data() {
    return {
      edad: null,
      ocupacion: null,
      antecedentes: null,
      marcapasos: false,
      audifonos: false,
      embarazo: false,
      protesis: false,
      diagnostico: null,
      medico_derivante: null,
      estudios_complementarios: null,
      mecanismo_de_lesion: null,
      antiguedad: null,
      localizacion: null,
      caracteristica: null,
      irradiacion: null,
      atenuacion_agravacion: null,
      observaciones: null,
    };
  },
  methods: {
    onSubmit(patient) {
      this.$store
        .dispatch("fichas/createFicha", {
          patient: patient,
          credential: {
            ocupacion: this.ocupacion || "",
            edad: this.edad || "",
            antecedentes: this.antecedentes || "",
            marcapasos: this.marcapasos || "",
            audifonos: this.audifonos || "",
            embarazo: this.embarazo || "",
            protesis: this.protesis || "",
            diagnostico: this.diagnostico || "",
            medico_derivante: this.medico_derivante || "",
            estudios_complementarios: this.estudios_complementarios || "",
            mecanismo_de_lesion: this.mecanismo_de_lesion || "",
            antiguedad: this.antiguedad || "",
            localizacion: this.localizacion || "",
            caracteristica: this.caracteristica || "",
            irradiacion: this.irradiacion || "",
            atenuacion_agravacion: this.atenuacion_agravacion || "",
            observaciones: this.observaciones || "",
          },
        })
        .then(async () => {
          this.$router.push({ name: "pacientes" });
        })
        .catch((error) => {
          Notify.create({
            color: "negative",
            position: "top",
            message: "Falló la creación de la ficha",
            icon: "report",
          });
          this.$router.push({ name: "pacientes" });
        });
    },
    cancel() {
      this.$router.push({ name: "fichas" });
    },
  },
  computed: {
    pacienteActual: {
      get() {
        return this.$store.getters["pacientes/pacienteActual"];
      },
    },
  },
};
</script>

<style>
.j-np-frame {
  padding: 20px;
}
.j-np-header {
  font-size: 1.75em;
  padding-left: 6px;
  padding-right: 6px;
  display: inline-flex;
}
.j-np-title {
  font-size: 1.5em;
  padding-left: 6px;
  padding-right: 6px;
  display: inline-flex;
}
.j-nf-card-1 {
  width: -webkit-fill-available;
  padding-left: 6px;
  padding-right: 6px;
  padding-bottom: 6px;
  padding-top: 6px;
  margin-bottom: 10px;
  /*align-self: baseline;*/
}
.j-np-button {
  margin-top: 16px;
}
.j-nf-icon-header {
  color: teal;
  font-size: 1.75em;
  margin-bottom: 8px;
  padding-left: 6px;
}
.j-nf-icon {
  color: teal;
  font-size: 1.5em;
  margin-bottom: 8px;
  padding-left: 6px;
}
</style>
