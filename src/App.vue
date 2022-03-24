<template>
  <v-app>
    <Header />
    <v-main class="grey lighten-5">
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data: () => ({
  })
}
</script>
<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;300;400;800&display=swap')
*
  font-family: 'Raleway', sans-serif !important
</style>