<template>
  <q-page class="items-center justify-evenly j-np-frame">
    <div>
      <q-icon class="j-nf-icon-header" name="post_add" />
      <p class="j-np-header">Editar ficha</p>
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
        :disable="loading_action"
        size="lg"
        @click="onSubmit(this.fichaActual)"
        style="background: #00bfad !important"
        class="full-width text-white"
        label="Guardar"
      >
        <q-spinner
          v-if="loading_action"
          color="primary"
          size="20px"
          class="j-btnSpinner"
        />
      </q-btn>
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
    <q-card-actions class="q-px-lg">
      <q-btn
        unelevated
        :disable="loading_action"
        size="lg"
        @click="deleteFicha(this.fichaActual)"
        style="background: red !important"
        class="full-width text-white"
        label="Eliminar"
      >
        <q-spinner
          v-if="loading_action"
          color="primary"
          size="20px"
          class="j-btnSpinner"
        />
      </q-btn>
    </q-card-actions>
  </q-page>
</template>

<script>
import { Notify } from "quasar";
export default {
  name: "EditFichaPage",
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
      loading_action: false,
    };
  },
  methods: {
    loadData() {
      this.ocupacion = this.fichaActual.ocupacion;
      this.edad = this.fichaActual.edad;
      this.antecedentes = this.fichaActual.antecedentes;
      this.marcapasos = this.fichaActual.marcapasos;
      this.audifonos = this.fichaActual.audifonos;
      this.embarazo = this.fichaActual.embarazo;
      this.protesis = this.fichaActual.protesis;
      this.diagnostico = this.fichaActual.diagnostico;
      this.medico_derivante = this.fichaActual.medico_derivante;
      this.estudios_complementarios = this.fichaActual.estudios_complementarios;
      this.mecanismo_de_lesion = this.fichaActual.mecanismo_de_lesion;
      this.antiguedad = this.fichaActual.antiguedad;
      this.localizacion = this.fichaActual.localizacion;
      this.caracteristica = this.fichaActual.caracteristica;
      this.irradiacion = this.fichaActual.irradiacion;
      this.atenuacion_agravacion = this.fichaActual.atenuacion_agravacion;
      this.observaciones = this.fichaActual.observaciones;
    },
    onSubmit(ficha) {
      this.loading_action = true;
      this.$store
        .dispatch("fichas/editFicha", {
          ficha: ficha,
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
          this.loading_action = false;
          this.$router.push({ name: "pacientes" });
        })
        .catch((error) => {
          Notify.create({
            color: "negative",
            position: "top",
            message: "Falló la edición de la ficha",
            icon: "report",
          });
          this.loading_action = false;
          //this.$router.push({ name: "pacientes" });
        });
    },
    cancel() {
      this.$router.push({ name: "fichas" });
    },
    deleteFicha(ficha) {
      this.loading_action = true;
      this.$store
        .dispatch("fichas/deleteFicha", { ficha: ficha })
        .then(async () => {
          this.loading_action = false;
          this.$router.push({ name: "pacientes" });
        })
        .catch((error) => {
          Notify.create({
            color: "negative",
            position: "top",
            message: "Falló la eliminación de la ficha",
            icon: "report",
          });
          this.loading_action = false;
          //this.$router.push({ name: "pacientes" });
        });
    },
  },
  computed: {
    pacienteActual: {
      get() {
        return this.$store.getters["pacientes/pacienteActual"];
      },
    },
    fichaActual: {
      get() {
        return this.$store.getters["fichas/fichaActual"];
      },
    },
  },
  mounted() {
    this.loadData();
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
.j-btnSpinner {
  margin-left: 6px;
}
</style>
