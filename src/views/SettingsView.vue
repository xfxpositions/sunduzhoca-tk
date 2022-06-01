<template>
  <v-container class="justify-center pa-5">
    <v-card max-width="1200" class="my-5 pa-5 ma-auto">
      <h1>Profil Fotoğrafı</h1>
      <file-upload @file="file" :baslik="'Avatar seçiniz'" />
      <v-btn color="primary" class="my-3" @click="onSave()">Gönder</v-btn>
      <v-progress-linear
        :model-value="uploadProgress.percent"
        color="light-blue"
        height="10"
        striped
      ></v-progress-linear>
      <p v-if="uploadProgress.started">
        {{
          uploadProgress.loaded / uploadProgress.total == 1
            ? "İşlem Tamamlandı"
            : "Yükleniyor"
        }}
      </p>
    </v-card>

    <change-password class="my-6 pa-5" />
  </v-container>
</template>

<script>
import fileUpload from "@/components/fileUpload.vue";
import changePassword from "@/components/changePassword.vue";
export default {
  data() {
    return {
      uploadProgress: {
        loaded: 0,
        total: 0,
        percent: 0,
        started: false,
      },
      image: null,
    };
  },
  methods: {
    file(event) {
      this.image = event;
    },
    onSave() {
      const fd = new FormData();
      console.log(this.image);
      fd.append("reqfile", this.image, this.image.name);
      fd.append(
        "userData",
        JSON.stringify({ _id: this.$store.getters._getCurrentUser._id })
      );
      const config = {
        onUploadProgress: (progressEvent) => {
          this.uploadProgress.started = true;
          this.uploadProgress.loaded = progressEvent.loaded;
          this.uploadProgress.total = progressEvent.total;
          this.uploadProgress.percent = Math.round(
            (this.uploadProgress.loaded / this.uploadProgress.total) * 100
          );
        },
      };
      this.$appAxios.post("/setavatar", fd, config).then((result) => {
        console.log(result);
        this.$store.commit("setUser", result.data.result[0]);
      });
    },
  },
  components: {
    fileUpload,
    changePassword,
  },
};
</script>
