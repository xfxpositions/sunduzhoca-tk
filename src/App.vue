<template>
  <link
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
    rel="stylesheet"
  />
  <link href="https://unpkg.com/pattern.css" rel="stylesheet" />

  <v-app>
    <app-bar-section />
    <v-main>
      <router-view />
    </v-main>
    <footerSection />
  </v-app>
</template>

<script>
import buffer from "buffer";
window.Buffer = window.Buffer || buffer.Buffer;

import footerSection from "@/components/footerSection.vue";
import appBarSection from "@/components/appBar.vue";
export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    footerSection,
    appBarSection,
  },
};
</script>
