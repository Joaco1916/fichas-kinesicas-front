<template>
  <q-page class="row justify-evenly page">
    <!-- Datos personales -->
    <q-card class="my-card j-main-page" flat bordered>
      <q-item>
        <q-icon name="assignment_ind" class="j-icon-profile-header text-teal" />

        <q-item-section>
          <q-item-label class="j-header-ficha">
            {{ fichaFormmated }}
            <q-icon
              @click="editFicha"
              name="edit"
              class="j-icon-micro text-teal"
            />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item>
        <q-icon name="person" class="j-icon-profile text-teal" />

        <q-item-section>
          <q-item-label class="j-title-ficha"> Datos personales </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Nombre
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.author.name }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Apellido
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.author.lastName }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Edad
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.edad }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Ocupación
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.ocupacion }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Antecedentes
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.antecedentes }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Marcapasos
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.marcapasos ? "Si" : "No" }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Audífonos
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.audifonos ? "Si" : "No" }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Embarazo
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.embarazo ? "Si" : "No" }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Protesis
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.protesis ? "Si" : "No" }}
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-separator />
    <!-- Motivos de consulta -->
    <q-card class="my-card j-main-page" flat bordered>
      <q-item>
        <q-icon name="assignment" class="j-icon-profile text-teal" />

        <q-item-section>
          <q-item-label class="j-title-ficha">
            Motivos de consulta
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Diagnóstico
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.diagnostico }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Medico derivante
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.medico_derivante }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Estudios complementarios
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.estudios_complementarios }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Antecedentes
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.antecedentes }}
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-separator />
    <!-- Dolor -->
    <q-card class="my-card j-main-page" flat bordered>
      <q-item>
        <q-icon name="healing" class="j-icon-profile text-teal" />

        <q-item-section>
          <q-item-label class="j-title-ficha"> Dolor </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Mecanismo de lesión
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.mecanismo_de_lesion }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Antigüedad
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.antiguedad }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Localización
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.localizacion }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Características
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.caracteristica }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Irradiación
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.irradiacion }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Atenuación / Agravación
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.atenuacion_agravacion }}
        </q-card-section>
      </q-card-section>
    </q-card>
    <q-separator />
    <!-- Extra -->
    <q-card class="my-card j-main-page" flat bordered>
      <q-item>
        <q-icon name="info" class="j-icon-profile text-teal" />

        <q-item-section>
          <q-item-label class="j-title-ficha"> Extra </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section class="col-4 j-subtitle-ficha text-center">
          Observaciones
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-8 text-center">
          {{ ficha.observaciones }}
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "FichaDetailsPage",
  methods: {
    editFicha() {
      this.$router.push({ name: "fichas-edit" });
    },
  },
  computed: {
    ficha: {
      get() {
        const fichaActual = this.$store.getters["fichas/fichaActual"];
        return fichaActual;
      },
    },
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
        return `${formattedDate.getDate()} de ${
          meses[formattedDate.getMonth()]
        } de ${formattedDate.getFullYear()}`;
      },
    },
  },
};
</script>

<style>
.j-column {
  display: flex;
  align-items: center;
}
.j-header-ficha {
  font-size: 1.5em;
  font-weight: 400;
  margin: 2px 5px;
}
.j-title-ficha {
  font-size: 1.3em;
  font-weight: 400;
  margin: 2px 5px;
}
.j-subtitle-ficha {
  font-size: 1em;
  font-weight: 600;
  margin: 2px 5px;
}
.j-icon-profile-header {
  font-size: 64px;
}
.j-icon-profile {
  font-size: 48px;
}
.j-icon-profile-mini {
  font-size: 32px;
}
.j-button {
  margin: 4px;
  border-radius: 100%;
  border: 1px solid teal;
  height: 70%;
}
.j-main-page {
  width: -webkit-fill-available;
  /*align-self: baseline;*/
}
</style>
