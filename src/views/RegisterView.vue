<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="Userdata.username"
        color="teal darken-1"
        label="Kullanıcı Adı"
      ></v-text-field>
      <v-text-field
        v-model="Userdata.email"
        :rules="emailRules"
        color="teal darken-1"
        label="Email"
        type="email"
        :error-messages="validateEmailErrors"
      ></v-text-field>
      <v-text-field
        v-model="Userdata.password"
        color="teal darken-1"
        label="Şifre"
        type="password"
      ></v-text-field>
      <v-text-field
        v-model="re_password"
        color="teal darken-1"
        label="Şifrenizi doğrulayın"
        type="password"
        required
        :error-messages="validatePasswordErrors"
      ></v-text-field>
      <v-btn :disabled="!valid" @click="submit()" ref="btn">Gönder</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import cryptoJs from "crypto-js";
export default {
  data: () => ({
    valid: true,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    rememberMe: false,
    Userdata: {
      password: "",
      username: "",
      email: "",
      encryptedPassword: "",
    },
    re_password: "",
  }),
  methods: {
    submit() {
      const key = this.$saltKey;
      const password = cryptoJs.AES.encrypt(this.Userdata.password, key);
      console.log(password.toString());
      this.Userdata.encryptedPassword = password.toString();
      this.$appAxios
        .post("/create", {
          name: this.Userdata.username,
          password: this.Userdata.encryptedPassword,
          email: this.Userdata.email,
        })
        .then((result) => {
          console.log(result);
          this.$router.push({ name: "login" });
        });
    },
  },
  watch: {},
  computed: {
    validatePasswordErrors() {
      const errors = [];
      if (this.re_password != "" && this.Userdata.password !== this.re_password)
        errors.push("Şifreler Uyuşmuyor");
      return errors;
    },
    validateEmailErrors() {
      const errors = [];
      if (this.Userdata.email != "" && this.Userdata.email.indexOf("@") < 0) {
        errors.push("Email adresi geçerli değil");
      }
      return errors;
    },
  },
};
</script>
