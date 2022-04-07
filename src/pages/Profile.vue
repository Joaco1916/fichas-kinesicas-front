<template>
  <q-page class="row justify-evenly page">
    <q-card class="my-card j-main-page" flat bordered>
      <q-item>
        <q-icon name="assignment_ind" class="j-icon text-teal" />

        <q-item-section>
          <q-item-label class="j-title-profile">
            Mi perfil
            <q-icon
              @click="editProfile"
              name="edit"
              class="j-icon-micro text-teal"
            />
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section class="col-3 j-subtitle-profile text-center">
          Nombre
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-4 text-center">
          {{ profile.name }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-3 j-subtitle-profile text-center">
          Apellido
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-4 text-center">
          {{ profile.lastName }}
        </q-card-section>
      </q-card-section>

      <q-card-section horizontal>
        <q-card-section class="col-3 j-subtitle-profile text-center">
          Email
        </q-card-section>

        <q-separator vertical />

        <q-card-section class="col-4 text-center">
          {{ profile.email }}
        </q-card-section>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ProfilePage",
  methods: {
    editProfile() {
      this.$router.push({ name: "profile-edit" });
    },
  },
  computed: {
    profile: {
      get() {
        return this.$store.getters["auth/profile"];
      },
    },
  },
});
</script>

<style>
.j-column {
  display: flex;
  align-items: center;
}
.j-title-profile {
  font-size: 2em;
  font-weight: 400;
  margin: 2px 5px;
}
.j-subtitle-profile {
  font-size: 50;
  font-weight: 600;
  margin: 2px 5px;
}
.j-icon {
  font-size: 64px;
}
.j-icon-mini {
  font-size: 32px;
}
.j-icon-micro {
  font-size: 24px;
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
