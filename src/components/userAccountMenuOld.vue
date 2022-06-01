<template>
  <div v-if="this.$store.getters._isAuthenticated" class="text-center">
    <v-menu transition="slide-y-transition">
      <template v-slot:activator="{ props }">
        <v-btn color="" v-bind="props">
          <v-icon fab depressed aria-hidden="false"> mdi-account </v-icon>
          Hesabım
        </v-btn>
      </template>

      <v-list>
        <template v-for="(item, index) in items" :key="index">
          <v-list-item
            @click="this.$router.push({ name: item.linkName })"
            :style="{ cursor: 'pointer' }"
            class="list-item"
          >
            <template class="icons">
              <v-list-item-title>
                <span class="material-icons">{{ item.icon }}</span>
                {{ item.title }}</v-list-item-title
              >
            </template>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </div>
  <template v-else>
    <v-btn @click="this.$router.push({ name: 'login' })">
      <v-icon fab depressed aria-hidden="false"> mdi-account </v-icon>
      Giriş Yap / Kayıt Ol
    </v-btn>
  </template>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Profilim", linkName: "profile", icon: "account_circle" },
      { title: "Gönderilerim", linkName: "mycontent", icon: "folder_open" },
      { title: "Ayarlar", linkName: "settings", icon: "settings" },
      { title: "Çıkış yap", linkName: "logout", icon: "logout" },
    ],
  }),
};
</script>
<style scoped>
.list-item:hover {
  background-color: #009688;
  color: white;
}
.icons {
  display: flex;

  justify-content: center;

  align-items: center;
}
</style>
