<template>
  <div>
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ props }">
        <a class="text-decoration-underline text-blue" v-bind="props"
          >Şifremi Unuttum</a
        >

        <p></p
      ></template>

      <v-card>
        <v-card-title>
          <h1>Şifrenizi mi unuttunuz</h1>
        </v-card-title>
        <v-card-text>
          <v-text-field color="blue" label="Emailinizi giriniz"></v-text-field>
          Kayıt olduğunuz email adresinize bir link göndereceğiz. Linke
          tıklayarak şifrenizi yenileyebilirsiniz.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal darken-1" type="email" @click="dialog = false">
            Kapat
          </v-btn>
          <v-btn color="teal darken-1" text @click="sendLink"> Gönder </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    sendLink() {},
  },
};
</script>
<style scoped>
cursor-pointer {
  cursor: pointer;
}
</style>
