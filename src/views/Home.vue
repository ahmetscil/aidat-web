<template>
  <v-item-group>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-card light flat>
            <v-card-title>aiddata hoş geldin</v-card-title>
            <router-link :to="{ name: 'Giris' }">
              oturum aç
            </router-link>
            <router-link :to="{ name: 'Kayit' }">
              üye ol
            </router-link>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Home',
    computed: mapState(['authuser']),
    mounted () {
      if (this.authuser.isLogined) {
        this.$router.push({ name: 'Ozet' })
      }
    }
  }
</script>
