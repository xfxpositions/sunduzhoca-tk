<template>
  <v-file-input
    :label="baslik"
    filled
    show-size
    prepend-icon="mdi-camera"
    @change="fileSelect"
    color="primary"
  ></v-file-input>
  <span id="preview">
    <img v-if="imagePath" :src="imagePath" />
  </span>
  <p v-if="imagePath">Dosya seçildi</p>
</template>
<script>
export default {
  emits: ["file"],
  props: ["baslik"],
  data() {
    return {
      imagePath: null,
      image: null,
    };
  },
  methods: {
    fileSelect(event) {
      this.image = event.target.files[0];
      this.imagePath = URL.createObjectURL(this.image);
      this.$emit("file", this.image);
    },
  },
};
</script>

<style scoped>
#preview {
  display: inline;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 350px;
}
</style>
