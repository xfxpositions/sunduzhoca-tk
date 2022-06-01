<template>
  <v-app>
    <v-container class="justify-center">
      <v-card>
        <v-card>
          <v-card-title
            >{{ user.createdAt }}
            <p>{{ user.createdAt }} tarihinde oluşturuldu.</p>
          </v-card-title>
          <v-card-content>
            <v-img class="c-image" :src="userImg" alt=""></v-img>
          </v-card-content>
        </v-card>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      userImg: "",
    };
  },
  mounted() {
    console.log(this.$route.params);
    this.$appAxios
      .post("/fetch", { filter: { name: this.$route.params.user } })
      .then((result) => {
        console.log(result);
        this.user = result.data.result[0];
        this.userImg = result.data.result[0].avatar.split("=")[0] + "=s192-c";
      });
  },
  computed: {},
};
</script>
<style scoped>
.c-image {
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  max-width: 200px;
  max-height: 200px;
}
</style>
