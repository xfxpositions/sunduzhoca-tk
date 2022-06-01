<template>
  <QuillEditor
    :modules="modules"
    theme="snow"
    :contentType="'html'"
    v-model:content="html"
    :toolbar="'full'"
  />
  <!-- <v-card>{{ html }}</v-card>s -->
</template>
<script>
import BlotFormatter from "quill-blot-formatter";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  data() {
    return {
      modules: {
        name: "blotFormatter",
        module: BlotFormatter,
        options: {
          /* options */
        },
      },

      html: this.$props.content,
    };
  },
  components: {
    QuillEditor,
  },
  props: ["content"],
  watch: {
    html() {
      console.log("emitted html");
      this.$emit("onSave", this.html);
    },
  },
  methods: {
    onSave() {
      this.$emit("onSave", this.html);
    },
  },
};
</script>
<style scoped>
.c-editor {
  min-height: 500px;
}
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap");
.quill-editor {
  font-family: "Roboto", sans-serif;
}
</style>
