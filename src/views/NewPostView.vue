<template>
  <v-container>
    <v-card max-width="1200" class="pa-6 ma-auto">
      <v-text-field
        color="primary"
        v-model="userData.title"
        label="Gönderi Başlığı"
      ></v-text-field>
      <text-editor :content="''" :action="action" @onSave="onEmit" />

      <v-select
        class="mt-5"
        color="primary"
        :items="tags"
        label="Kategori Seçiniz"
        v-model="category"
      ></v-select>
      <file-upload :baslik="'Resmi seçiniz'" @file="file" />
      <v-btn
        :disabled="onloading"
        @clicked="onloading = !onloading"
        class="my-4"
        color="primary"
        @click="onSave()"
        >Gönder</v-btn
      >

      <v-progress-linear
        :model-value="uploadProgress.percent"
        color="light-blue"
        height="10"
        striped
      ></v-progress-linear>
      <p>
        {{
          uploadProgress.loaded / uploadProgress.total == 1
            ? "İşlem Tamamlandı"
            : "Yükleniyor"
        }}
      </p>
    </v-card>
  </v-container>
</template>

<script>
import fileUpload from "@/components/fileUpload.vue";
import textEditor from "@/components/textEditor.vue";
export default {
  data() {
    return {
      category: "",
      html: "",
      onloading: false,
      action: false,
      uploadProgress: {
        loaded: 0,
        total: 0,
        percent: 0,
      },
      tags: [],
      userData: {
        title: null,
        content: null,
        tags: [],
        creator: null,
        creator_avatar: null,
        category: "",
      },
      image: null,
      xd: 40,
    };
  },
  components: {
    fileUpload,
    textEditor,
  },
  mounted() {
    this.$appAxios.get("/tags").then((result) => {
      this.tags = result.data.result.tags;
    });
    this.userData.creator = this.$store.getters._getCurrentUser.name;
    this.userData.creator_avatar = this.$store.getters._getCurrentUser.avatar;
  },
  watch: {
    category(oldi, newi) {
      console.log(oldi, newi);
    },
  },
  methods: {
    file(event) {
      this.image = event;
    },
    onEmit(html) {
      this.html = html;
    },
    onSave() {
      this.userData.content = this.html;
      const fd = new FormData();
      console.log(this.image);
      fd.append("reqfile", this.image, this.image.name);
      fd.append("userData", JSON.stringify(this.userData));
      const config = {
        onUploadProgress: (progressEvent) => {
          this.uploadProgress.loaded = progressEvent.loaded;
          this.uploadProgress.total = progressEvent.total;
          this.uploadProgress.percent = Math.round(
            (this.uploadProgress.loaded / this.uploadProgress.total) * 100
          );
        },
      };
      this.$appAxios.post("/createpost", fd, config);
    },
  },
};
</script>
