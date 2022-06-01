<template>
  <v-container class="d-flex justify-center">
    <h1>
      Tekrar Görüşürüz
      <span class="text-blue">{{
        this.$store.getters._getCurrentUser?.name
      }}</span>
    </h1>
  </v-container>
</template>

<script>
export default {
  mounted() {
    if (!this.$store.getters._getCurrentUser) {
      this.$router.push({ name: "home" });
    }

    setTimeout(() => {
      if (localStorage.getItem("rememberMe") && localStorage.getItem("vuex"))
        localStorage.removeItem("vuex");
      else sessionStorage.removeItem("vuex");
      this.$router.go({ name: "home" });
    }, 2000);
  },
};
</script>
