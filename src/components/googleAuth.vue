<template>
  <v-btn
    :disabled="!Vue3GoogleOauth.isInit"
    color="red red-darken-1"
    class="text-white d-flex justify-between"
    @click="signIn()"
  >
    <v-icon>mdi-google</v-icon>
    <strong>google </strong>
  </v-btn>
</template>

<script>
import { inject } from "vue";

export default {
  setup() {
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");
    return {
      Vue3GoogleOauth,
    };
  },
  data() {
    return {
      isLogin: false,
      user: {},
    };
  },
  methods: {
    async signIn() {
      const googleUser = await this.$gAuth.signIn();
      if (!googleUser) {
        return null;
      } else {
        this.user = googleUser.getBasicProfile();

        const Cuser = {
          name: this.user.getName(),
          avatar: this.user.getImageUrl(),
          googleImg: this.user.getImageUrl(),
          email: this.user.getEmail(),
          createdVia: "gAuth",
        };
        console.log(Cuser);

        this.$appAxios
          .post("/fetch", { filter: { email: this.user.getEmail() } })

          .then((result) => {
            if (result.data.result.length == 0) {
              this.$appAxios.post("/create", Cuser).then((result) => {
                console.log(result);

                this.$appAxios
                  .post("/setavatarurl", {
                    _id: result.data.result._id,
                    avatar: Cuser.avatar,
                  })
                  .then((result) => {
                    console.log("img upload result : ", result);

                    this.$appAxios
                      .post("/fetch", {
                        filter: { email: this.user.getEmail() },
                      })
                      .then((result) => {
                        this.$store.commit("setUser", result.data.result[0]);
                        localStorage.setItem(
                          "currentUserName",
                          this.user.getName()
                        );
                        this.$router.push({ name: "home" });
                        console.log("login with sign up ");
                      });
                  });
              });
            } else {
              console.log("login withoud sign up ");
              this.$store.commit("setUser", result.data.result[0]);

              localStorage.setItem("currentUserName", this.user.getName());
              this.$router.push({ name: "login" });
            }
          });
      }
    },
  },
};
</script>
<style scoped>
.text-white {
  color: white;
}
</style>
