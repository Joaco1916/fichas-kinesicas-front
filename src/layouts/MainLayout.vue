<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="manage_accounts"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="q-mx-md">
          <q-avatar>
            <img src="../../public/logo_FK_centrado_4k.png" />
          </q-avatar>
          Fichas kinesicas
        </q-toolbar-title>

        <!-- <div>{{ getInitials(this.profile) }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="100"
      show-if-above
      overlay
      elevated
    >
      <q-list>
        <q-item exact clickable tag="a" target="_self" @click="getProfile()">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Mi perfil</q-item-label>
          </q-item-section>
        </q-item>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />

        <q-item exact clickable tag="a" target="_self" @click="signOut()">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Cerrar sesión</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer dark elevated>
      <q-tabs dense class="bg-grey-4 text-teal">
        <q-route-tab
          to="/pacientes"
          name="pacientes"
          icon="people"
          label="Pacientes"
        />
        <q-route-tab
          to="/pacientes-new"
          name="pacientes-new"
          icon="person_add"
          label="Nuevo paciente"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  /*{
    title: "Inicio",
    icon: "home",
    link: "#/pacientes",
  },
  {
    title: "Mi perfil",
    icon: "person",
    link: "#/profile",
  },*/
  {
    title: "Configuración",
    icon: "settings",
    link: "#/settings",
  },
  /*{
    title: "Cerrar sesión",
    icon: "logout",
    link: "#/login",
  },*/
];

import { defineComponent, ref } from "vue";
import { Notify } from "quasar";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },
  methods: {
    signOut() {
      this.$store.dispatch("auth/signOut").finally(() => {
        Notify.create({
          color: "positive",
          position: "top",
          message: "Hasta la proxima.",
          icon: "waving_hand",
        });
        this.$router.push({ name: "login" });
      });
    },
    getProfile() {
      this.$store.dispatch("auth/getProfile").then((response) => {
        this.$router.push({ name: "profile" });
      });
    },
    getInitials(user) {
      let initials =
        "" +
        user.name.toUpperCase().charAt(0) +
        user.lastName.toUpperCase().charAt(0);
      return initials;
    },
  },

  computed: {
    profile: {
      get() {
        return this.$store.getters["auth/profile"];
      },
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

<style>
/*@media screen and (min-width:768px){
    .q-footer{
      display: none;
    }
  }*/
</style>
