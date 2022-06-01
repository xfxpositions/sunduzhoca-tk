<template>
  <v-container>
    <v-card max-width="1200" class="pa-6 ma-auto">
      <h1>Gönderilerim</h1>
      <v-btn class="my-10" @click="this.$router.push({ name: 'newpost' })"
        >Yeni Gönderi Oluştur</v-btn
      >

      <v-row class="d-flex justify-start mb-6" justify="space-around"
        ><v-col v-for="post in posts" :key="post" cols="12" sm="5">
          <v-card elevation="3" shaped>
            <v-card-title
              >{{ post.title + "   / " }}

              <span style="right: 0px">
                {{ new Date(post.creationDate).toLocaleDateString() }}</span
              >
            </v-card-title>

            <div class="pa-4">
              <v-btn
                class="mx-10"
                @click="
                  this.$router.push(`/posts/@${post.creator}/${post._id}`)
                "
                >Gönderiye git</v-btn
              >
              <v-btn @click="removePost()">Sil</v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.$appAxios
      .post("/findpostbyfilter", {
        filter: { creator: this.$store.getters._getCurrentUser.name },
      })
      .then((result) => {
        console.log(result);
        this.posts = result.data.result;
      });
  },
  methods: {
    removePost() {},
  },
};
</script>
