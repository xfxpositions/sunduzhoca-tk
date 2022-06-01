import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import appAxios from "@/utils/appAxios";

loadFonts();

const app = createApp(App);
import gAuthPlugin from "vue3-google-oauth2";
const gAuthOptions = {
  clientId:
    "749299419944-sgjtpqse4phrsth9f77ml8d860jtksll.apps.googleusercontent.com",
};

app.use(router);
app.use(store);
app.use(vuetify);
app.use(gAuthPlugin, gAuthOptions);

app.mount("#app");
app.config.globalProperties.$appAxios = appAxios;
const saltKey =
  "6c9a04aa7ab1175c269d1515e6bdb0b2240b2a3d0409713c507f9eaa68aa71f6979";
app.config.globalProperties.$secret = process.env.VUE_APP_SECRET;
app.config.globalProperties.$saltKey = saltKey;
