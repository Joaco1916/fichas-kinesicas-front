<template>
  <div
    class="fullscreen my-bg-tl text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <q-avatar class="sz-box">
        <img class="sz-box" src="../../public/logo_FK_centrado_4k.png" />
      </q-avatar>

      <div style="font-size: 6vh; margin: 8px 0px">Lo sentimos</div>

      <div style="font-size: 5vh; opacity: 0.4">
        Esta no es una página válida.
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="teal"
        unelevated
        to="/"
        icon="home"
        label="Inicio"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFoundPage",
});
</script>

<style>
.my-bg-tl {
  background: #008990;
}
.sz-box {
  width: 100px;
  height: 100px;
}
</style>
