const routes = [
  {
    path: "/auth",
    component: () => import("layouts/Login.vue"),
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("pages/Login.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("pages/Register.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("pages/pacientes/Pacientes.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/pacientes",
        name: "pacientes",
        component: () => import("pages/pacientes/Pacientes.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/pacientes-new",
        name: "pacientes-new",
        component: () => import("pages/pacientes/NewPaciente.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/pacientes-edit",
        name: "pacientes-edit",
        component: () => import("pages/pacientes/EditPaciente.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/:id",
        name: "pacientes-details",
        component: () => import("pages/pacientes/PacientesDetails.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/fichas",
        name: "fichas",
        component: () => import("pages/fichas/Fichas.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/fichas-new",
        name: "fichas-new",
        component: () => import("pages/fichas/NewFicha.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/fichas-edit",
        name: "fichas-edit",
        component: () => import("pages/fichas/EditFicha.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "fichas/:id",
        name: "fichas-details",
        component: () => import("pages/fichas/FichasDetails.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("pages/Profile.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/profile-edit",
        name: "profile-edit",
        component: () => import("pages/EditProfile.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("pages/Settings.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
