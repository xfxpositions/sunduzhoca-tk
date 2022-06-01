<template>
  <v-app-bar>
    <v-btn to="/">
      <span class="text-blue font-weight-light">Sündüz</span>
      <span class="font-weight-bold">Hoca</span>
      <span>.com</span>
    </v-btn>
    <v-spacer></v-spacer>
    <user-account-menu />
  </v-app-bar>
</template>

<script>
import userAccountMenu from "@/components/userAccountMenu.vue";
export default {
  components: {
    userAccountMenu,
  },
};
</script>
