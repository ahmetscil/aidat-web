<template>
  <div>
    <v-snackbar v-model="snackbar" :timeout="timeout" :color="snacktype">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="dark" dense v-bind="attrs" @click="snackbar = false">
          x
        </v-btn>
      </template>
    </v-snackbar>
    <v-row v-if="authuser.isLogined">
      <v-col cols="2">
        <Sidebar />
      </v-col>
      <v-col cols="10">
        <v-item-group>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" md="12">
                  <h1>Apartmanlarım</h1>
                  <h2>Yöneticisi veya sakini olduğum apartmanlar</h2>
                </v-col>
                <v-col v-for="(ap, a) in user_apertments" :key="'apt' + a" cols="12" md="6">
                  <v-card light flat>
                    <v-card-title>
                      <h2>{{ap.apertmentName}}</h2>
                      <small><kbd>{{ap.code}}</kbd></small>
                    </v-card-title>
                    <v-card-text>Daire: {{ap.flet}}</v-card-text>
                    <v-card-text v-if="ap.manager == 1">Yönetici</v-card-text>
                    <v-card-text v-else>Kat Sakini</v-card-text>
                    <v-card-actions>
                      <v-btn color="secondary" block @click="selectApt(ap)">
                        Bu apartman ile devam et.
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-item-group>
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import Sidebar from '../components/Sidebar'
  export default {
    name: 'Apartmanlarim',
    components: {
      Sidebar
    },
    computed: mapState(['authuser', 'user_apertments', 'errorMessage']),
    watch: {
      errorMessage: function (e) {
        for (let x = 0; x < e.length; x++) {
          this.snackText = e[x]
          this.snackbar = true
          this.snacktype = 'warning'
        }
      }
    },
    data() {
      return {
        snackbar: false,
        snackText: 'Bir hata ile karşılaşıldı.',
        snacktype: 'warning',
        timeout: 2500
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.$store.dispatch('get_apertment', {...this.data, query: `?user=${JSON.parse(localStorage.getItem('authUser')).user.id}`})
      },
      selectApt (e) {
        this.$store.commit('set_apertment', e)
        if (localStorage.getItem('myApertment')) {
          this.$router.push({ name: 'Ozet' })
        }
      }
    }
  }
</script>
