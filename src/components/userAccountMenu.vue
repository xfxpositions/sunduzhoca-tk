<template>
  <div v-if="this.$store.getters._isAuthenticated" class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" anchor="start">
      <template v-slot:activator="{ props }">
        <v-btn color="indigo" v-bind="props">Hesabım</v-btn>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item :title="user.name" subtitle="Merhaba">
            <v-list-item-avatar
              ><v-img
                cover
                class="pa-7 secondary rounded-circle d-inline-bloc"
                :src="this.$store.getters._getCurrentUser.avatar"
              ></v-img
            ></v-list-item-avatar>

            <template v-slot:append></template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item
            @click="
              this.$router.push(
                '/profile/@' + this.$store.getters._getCurrentUser.name
              )
            "
            :style="{ cursor: 'pointer' }"
            class="list-item"
          >
            <template class="icons">
              <v-list-item-title>
                <span class="material-icons">account_circle</span>
                Profilim</v-list-item-title
              >
            </template>
          </v-list-item>
          <template v-for="item in items" :key="item">
            <v-list-item
              @click="this.$router.push(item.linkName)"
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

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="menu = false"> Kapat </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
  <div v-else>
    <v-btn @click="this.$router.push({ name: 'login' })"
      >Giriş Yap / Kayıt ol</v-btn
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    menu: false,
    user: null,
    items: [
      { title: "Gönderilerim", linkName: "/mycontent", icon: "folder_open" },
      { title: "Ayarlar", linkName: "/settings", icon: "settings" },
      { title: "Çıkış yap", linkName: "/logout", icon: "logout" },
    ],
  }),
  mounted() {
    console.log(this.$store.getters._getCurrentUser);
    this.user = this.$store.getters._getCurrentUser;
    axios
      .post("http://localhost:3000/find", {
        email: this.$store.getters._getCurrentUser?.email,
      })
      .catch((err) => {
        console.log("err : " + err);
      })
      .then((result) => {
        console.log(result.data.result.email);
      });
  },
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
.rounded-image {
  border-radius: 50%;
}
</style>
