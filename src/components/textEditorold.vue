<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-textarea
        name="input-7-1"
        label="Default style"
        hint="Hint text"
      ></v-textarea>
    </v-col>
  </v-row>
  <v-btn @click="add('h1', $event)">Add h1</v-btn>
  <v-btn @click="add('p', $event)">Add p</v-btn>
  <v-btn @click="add('img', $event)">Add img</v-btn>

  <v-textarea></v-textarea>
  <v-textarea v-model="raw">{{ raw }}</v-textarea>
  <v-card>
    <v-card-title>Preview</v-card-title>
    <v-card-content v-html="raw"></v-card-content>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      raw: "",
    };
  },
  methods: {
    add(w, event) {
      console.log(event);
      this.raw += `<${w}>${document.getSelection()}</${w}>`;
    },
  },
};
</script>
