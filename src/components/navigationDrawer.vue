<template>
  <v-app-bar-nav-icon
    variant="text"
    @click.stop="drawer = !drawer"
  ></v-app-bar-nav-icon>
  <v-navigation-drawer
    class="deep-purple accent-4"
    v-model="drawer"
    app
    color="indigo"
  >
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content color="indigo">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: "İçeriklerim", icon: "dashboard" },
        { title: "Profilim", icon: "mdi-account" },
        { title: "Admin", icon: "gavel" },
      ],
    };
  },
};
</script>
