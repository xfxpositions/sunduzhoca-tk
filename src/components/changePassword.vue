<template>
  <v-card max-width="1200" class="ma-auto justify-center">
    <h1>Şifre</h1>
    <v-text-field
      v-model="userData.currentPassword"
      color="primary"
      label="Mevcut şifrenizi giriniz"
    >
    </v-text-field>
    <div class="d-flex justify-between">
      <v-text-field
        v-model="userData.newPassword"
        class="mx-2"
        color="primary"
        label="Yeni şifrenizi giriniz"
      >
      </v-text-field>

      <v-text-field
        v-model="userData.confirmNewPassword"
        color="primary"
        label="Yeni şifrenizi onaylayınız"
      >
      </v-text-field>
    </div>
    <v-btn @click="onSave()" color="primary">Gönder</v-btn>
  </v-card>
</template>
<script>
import crypto from "@/utils/crypto";
export default {
  data() {
    return {
      userData: {
        currentPassword: null,
        newPassword: null,
        confirmNewPassword: null,
      },
    };
  },
  methods: {
    onSave() {
      const email = this.$store.getters._getCurrentUser.email;
      this.$appAxios.post("/find", { email: email }).then((result) => {
        console.log(result);
        if (
          crypto.encrypt(this.currentPassword) == result.data.result[0].password
        ) {
          this.$appAxios
            .post("/update", { filter: { password: this.newPassword } })
            .then((result) => {
              console.log(result);
            });
        } else {
          console.log("wrong");
        }
      });
    },
  },
};
</script>
