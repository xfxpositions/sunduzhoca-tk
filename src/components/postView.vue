<template>
  <template v-for="post in posts" :key="post">
    <v-card shaped elevation="10">
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
          this.$router.push(`/posts/@${post.creator}/${post.title}.${post._id}`)
        "
        style="margin-top: 10px; cursor: pointer; text-decoration: underline"
      >
        {{ post.creator }} tarafından oluşturuldu.
        <span style="right: 0px">{{
          new Date(post.creationDate).toLocaleDateString()
        }}</span>
        <span v-for="tag in post.tags" :key="tag">{{ tag }},</span>
      </p>
      <v-card-title>{{ post.title }}</v-card-title>
      <v-card-text>{{
        this.$props.preview
          ? post.content.length > 280
            ? post.content.substring(0, 280) + "..."
            : post.content
          : post.content
      }}</v-card-text>
      <v-btn
        @click="
          this.$router.push(`/posts/@${post.creator}/${post.title}.${post._id}`)
        "
        >Devamını oku</v-btn
      >
    </v-card>
  </template>
</template>
<script>
export default {
  data() {
    return { posts: this.$props.data };
  },
  mounted() {
    console.log(this.$props.data);
  },
  props: ["data", "preview"],
};
</script>
