<template>
  <v-container class="text-center">
    <h1>
      Merhaba
      <span class="text-blue"
        >{{
          this.$store.getters._isAuthenticated
            ? this.$store.getters._getCurrentUser.name
            : "ziyaretçi"
        }}
      </span>
      ,seni gördüğümüze sevindik.
    </h1>
    <h2>Son eklenen gönderiler</h2>
    <v-row justify="space-around"
      ><v-col
        v-for="(post, index) in posts.slice().reverse()"
        :key="post"
        cols="12"
        sm="5"
      >
        <v-card class="mx-2 my-3 pb-5" elevation="3" shaped>
          <v-img
            height="400"
            cover
            :ref="'image' + index"
            :src="post.image"
          ></v-img>

          <v-row class="pa-3">
            <v-img
              cover
              style="float: left"
              max-height="30"
              max-width="30"
              class="pa-4 ma-2 secondary rounded-circle d-inline-bloc"
              :src="post.creator_avatar"
            ></v-img>

            <div class="pa-2">
              <p
                @click="
                  this.$router.push(`/posts/@${post.creator}/${post._id}`)
                "
                style="
                  margin-top: 10px;
                  cursor: pointer;
                  text-decoration: underline;
                "
              >
                {{ post.creator }} tarafından oluşturuldu.
                <span style="right: 0px"
                  >{{ timeSince(new Date(post.creationDate)) }} önce.
                </span>
                <span v-for="tag in post.tags" :key="tag">{{ tag }},</span>
                <span>{{ post.category }}</span>
              </p>
            </div>
          </v-row>

          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>{{
            post.content.length > 280
              ? post.content.substring(0, 280).replace(/<[^>]+>/g, "") + "..."
              : post.content.replace(/<[^>]+>/g, "")
          }}</v-card-text>
          <v-btn
            @click="this.$router.push(`/posts/@${post.creator}/${post._id}`)"
            >Devamını oku</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    timeSince(date) {
      var seconds = Math.floor((new Date() - date) / 1000);

      var interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " yıl";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " ay";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " gün";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " saat";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " dakika";
      }
      return Math.floor(seconds) + " saniye";
    },
    checkAuth() {
      console.log("qwe");
    },
    imgUrl(imgId) {
      "qwe".return(
        "data:" +
          this.posts[imgId].image.contentType +
          ";base64," +
          new Buffer(this.posts[imgId].image.data.data).toString("base64")
      );
    },
  },
  computed: {},
  mounted() {
    this.$appAxios
      .post("/findpostbyfilter", {
        filter: {},
      })
      .then((result) => {
        console.log(result);
        this.posts = result.data.result;
      });
  },
};
</script>
<style scoped>
.c-image {
  width: 200px;
  height: 300px;
  object-fit: contain;
}
.v-btn {
  background: #00897b;
  color: #f2f9f8;
}
</style>
