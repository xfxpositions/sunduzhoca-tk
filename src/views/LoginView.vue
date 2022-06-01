<template>
  <v-container>
    <v-card max-width="1200" class="ma-auto pa-6">
      <template v-if="this.$store.getters._isAuthenticated">
        <h2>
          {{ this.$store.getters._getCurrentUser.name }} olarak giriş yapıldı
          <a @click="logout()" class="text-blue">Çıkış Yap</a>
        </h2>
      </template>
      <template v-else>
        <v-text-field
          v-model="Userdata.email"
          color="teal darken-1"
          label="Email"
        ></v-text-field>
        <v-text-field
          v-model="Userdata.password"
          color="teal darken-1"
          label="Şifre"
        ></v-text-field>
        <v-checkbox
          color="teal darken-1"
          v-model="rememberMe"
          label="Beni hatırla"
        ></v-checkbox>
        <forgot-password />
        <p class="red">
          Üye değilim,
          <a class="text-blue" @click="this.$router.push({ name: 'register' })"
            >üye olmak istiyorum.</a
          >
        </p>

        <br />
        <p class="fg-red">{{ response }}</p>
        <div class="d-flex pa-2">
          <v-btn class="mr-3" @click="loginEvent()">Giriş Yap</v-btn>
          <google-auth />
        </div>
      </template>
    </v-card>
  </v-container>
</template>
<script>
import forgotPassword from "@/components/forgotPassword.vue";
import cryptoJs from "crypto-js";
import googleAuth from "@/components/googleAuth.vue";

export default {
  data() {
    return {
      rememberMe: false,
      Userdata: {
        email: "",
        password: "",
      },
      response: "",
    };
  },
  methods: {
    loginEvent() {
      if (this.rememberMe) {
        localStorage.setItem("rememberMe", true);
      } else {
        localStorage.setItem("rememberMe", false);
      }

      console.log();
      this.$appAxios
        .post("/find", { email: this.Userdata.email })
        .catch((err) => {
          console.log("err : " + err);
          this.response = "Hata : Hesap bulunamadı";
        })
        .then((result) => {
          console.log(result);
          /*console.log(
            cryptoJs.AES.decrypt(
              result.data.result[0].password,
              this.$saltKey
            ).toString(cryptoJs.enc.Utf8)*/

          if (
            this.Userdata.password ==
            cryptoJs.AES.decrypt(
              result.data.result[0].password,
              this.$saltKey
            ).toString(cryptoJs.enc.Utf8)
          ) {
            this.$store.commit("setUser", result.data.result[0]);
            localStorage.setItem("currentUserName", result.data.result[0].name);
            this.$router.push({ name: "home" });
          } else {
            console.log("response error");
            this.response = "Hata : Yanlış Şifre";
          }
        });
    },
    logout() {
      if (localStorage.getItem("rememberMe") == "true")
        localStorage.removeItem("vuex");
      else sessionStorage.removeItem("vuex");
      this.$router.go({ name: "login" });
    },
  },
  components: {
    forgotPassword,
    googleAuth,
  },
};
</script>
