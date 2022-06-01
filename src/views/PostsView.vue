<template>
  <v-app>
    <v-container>
      <template v-for="post in posts" :key="post">
        <v-card max-width="1500" class="pa-6 ma-auto my-5" shaped elevation="5">
          <v-img
            class="ma-auto"
            cover
            max-width="60%"
            height="400"
            :src="post.image"
          >
          </v-img>
          <v-img
            cover
            style="float: left"
            max-height="30"
            max-width="30"
            class="pa-4 ma-2 secondary rounded-circle d-inline-bloc"
            :src="post.creator_avatar"
          ></v-img>
          <p
            @click="
              this.$router.push(
                `/posts/@${post.creator}/${post.title}.${post._id}`
              )
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

            <v-btn class="ml-4" @click="likeFunc()"
              >{{ likesCount
              }}<v-icon>{{
                liked ? "mdi-thumb-up" : "mdi-thumb-up-outline"
              }}</v-icon></v-btn
            >
            <v-btn class="ml-4" @click="dislikeFunc()"
              ><v-icon>{{
                disliked ? "mdi-thumb-down" : "mdi-thumb-down-outline"
              }}</v-icon></v-btn
            >
            <span>{{ post.category }}</span>
          </p>
          <span>{{ readCount }} kez okundu</span>
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text class="text-center" v-html="post.content"></v-card-text>
        </v-card>

        <v-card elevation="5" max-width="1500" class="pa-6 text-center ma-auto">
          <v-card-title>Yorumlar</v-card-title>
          <div class="d-flex flex-column">
            <div class="d-flex">
              <v-text-field
                class="mx-5"
                color="primary"
                label="İsim"
                style="max-width: 200px; max-height: 100px"
                v-model="userComment.title"
              ></v-text-field>
              <v-text-field
                color="primary"
                label="Yorum yap"
                style="max-height: 100px"
                v-model="userComment.content"
              ></v-text-field>
              <v-btn @click="saveComment" color="primary mx-5">Gönder</v-btn>
            </div>

            <v-divider class="mx-4"></v-divider>
          </div>

          <v-list>
            <template v-for="comment in posts[0].comments" :key="comment">
              <v-card elevation="3" class="pa-5 d-flex flex-column text-left">
                <h2>{{ comment.title }}</h2>
                <v-card elevation="5">
                  <p>{{ comment.content }}</p>
                </v-card>
              </v-card>
            </template>
          </v-list>
        </v-card>
      </template>
    </v-container>
  </v-app>
</template>
<script>
export default {
  methods: {
    likeFunc() {
      if (this.liked) {
        this.$appAxios
          .post("/poststats", {
            _id: this.posts[0]._id,
            updaten: { likes: -1 },
          })
          .then((result) => {
            console.log(result);
          });
      } else {
        this.$appAxios
          .post("/poststats", {
            _id: this.posts[0]._id,
            updaten: { likes: 1 },
          })
          .then((result) => {
            this.likesCount = result.data.result.likes;
            console.log(result);
          });
      }

      if (this.disliked) this.disliked = this.liked;
      this.liked = !this.liked;
    },
    dislikeFunc() {
      if (this.liked) this.liked = this.disliked;
      this.disliked = !this.disliked;
    },
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
    saveComment() {
      this.$appAxios
        .post("/updatepost", {
          _id: this.posts[0]._id,
          update: this.userComment,
        })
        .then(() => {
          this.$router.go(this.$router.currentRoute);
        });
    },
  },
  watch: {},
  computed: {},
  data() {
    return {
      liked: false,
      disliked: false,
      likesCount: null,
      posts: [],
      userComment: {
        title: null,
        content: null,
      },
      readCount: null,
    };
  },
  mounted() {
    const params = this.$route.params;
    console.log("params", params);
    this.$appAxios
      .post("/posts", {
        creator: params.creator,
        id: params.id,
      })
      .catch((err) => {
        console.log("err : " + err);

        this.$router.push("/404");
      })
      .then((result) => {
        console.log(result);
        this.likesCount = result.data.result[0].likes;
        this.posts = result.data.result;
        console.log(result.data.result[0].likes);
        this.readCount = result.data.result[0].readCount;
        this.$appAxios
          .post("/poststats", {
            _id: this.posts[0]._id,
            updaten: { read_count: 1 },
          })
          .then((result) => {
            this.readCount = result.data.result.read_count;
          });
      });
  },
};
</script>
<style scoped></style>
