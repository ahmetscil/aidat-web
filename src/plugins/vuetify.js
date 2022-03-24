import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#c7d82e',
        secondary: '#9ac842',
        anchor: '#47552e',
      },
    },
  },
})

export default vuetify