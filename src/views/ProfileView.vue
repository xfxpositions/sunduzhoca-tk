<template>
  <v-app>
    <v-container>
      <v-card max-width="1200" class="ma-auto d-flex pa-4 my-4 justify-between">
        <v-img class="c-image" elevation="10" :src="user.avatar"> </v-img>
        <div>
          <p>İsim : {{ user.name }}</p>
          <p>
            Katılım :
            {{ new Date(user.createdAt).toLocaleDateString() }}
          </p>
          <p>
            Son etkinlik : {{ user.name }} isimli kullanıcının profilini
            inceliyor.
          </p>
        </div>
      </v-card>

      <v-card max-width="1200" class="pa-5 ma-auto pa-3">
        <h1 class="text-center">Gönderiler</h1>
        <v-btn @click="gonderilerActive = !gonderilerActive"
          ><v-icon>{{ gonderilerActive ? "mdi-eye" : "mdi-eye-off" }}</v-icon>
        </v-btn>

        <template v-if="gonderilerActive">
          <v-row class="d-flex justify-start mb-6" justify="space-around"
            ><v-col v-for="post in posts" :key="post" cols="12" sm="5">
              <v-card elevation="3" shaped>
                <v-card-title
                  >{{ post.title + "   / " }}

                  <span style="right: 0px">
                    {{ new Date(post.creationDate).toLocaleDateString() }}</span
                  >
                </v-card-title>

                <div class="pa-4 text-center">
                  <v-btn
                    absolute
                    color="primary"
                    class="mx-10 text-center"
                    @click="
                      this.$router.push(
                        `/posts/@${post.creator}/${post.title}.${post._id}`
                      )
                    "
                    >Gönderiye git</v-btn
                  >
                </div>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      gonderilerActive: false,
      posts: [],
    };
  },
  mounted() {
    console.log(this.$route.params);
    this.$appAxios
      .post("/fetch", { filter: { name: this.$route.params?.user } })
      .catch((err) => {
        console.log("err", err);
      })
      .then((result) => {
        if (result.data.result.length == 0) {
          console.log("undefined user");
          this.$router.push("/404");
        } else {
          console.log(result);
          this.user = result.data.result[0];
        }
      });
    this.$appAxios
      .post("/findpostbyfilter", {
        filter: { creator: this.$store.getters._getCurrentUser.name },
      })
      .then((result) => {
        console.log("posts fetch ", result);
        this.posts = result.data.result;
      });
  },
};
</script>
<style scoped>
.c-image {
  overflow: hidden;
  object-fit: contain;
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
  border: 1px solid black;
}
</style>
