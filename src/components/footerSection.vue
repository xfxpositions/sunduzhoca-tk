<template>
  <v-footer
    class="bg-indigo-lighten-1 text-white text-center d-flex flex-column"
  >
    <div>
      <v-btn
        v-for="icon in icons"
        :key="icon"
        class="mx-4 text-white"
        :icon="icon"
        variant="text"
      ></v-btn>
    </div>

    <v-divider></v-divider>

    <div class="text-white">
      {{ new Date().getFullYear() }} — <strong>SunduzHoca.com</strong>
    </div>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
  }),
};
</script>
