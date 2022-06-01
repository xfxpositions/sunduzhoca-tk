// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import colors from "vuetify/lib/util/colors";

// Vuetify
import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.teal.darken1, // #E53935
          secondary: colors.green.lighten1, // #FFCDD2
          error: colors.red.accent3,
          white: "#FFFFFF",
          //background: "#EAEAEB",
        },
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
});
