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
            <v-row>
              <v-col cols="12" md="12">
                <h1>Gelir-Gider</h1>
                <h2>{{apertmentData.apertmentName}} Ödemelerim</h2>
                <v-card light flat class="mt-3">
                  <CreditCard />
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import Sidebar from '../components/Sidebar'
  import CreditCard from '../components/CreditCard'
  export default {
    name: 'GelirGider',
    components: {
      Sidebar,
      CreditCard
    },
    computed: mapState(['authuser', 'returnCount', 'user_orders', 'errorMessage']),
    watch: {
      errorMessage: function (e) {
        for (let x = 0; x < e.length; x++) {
          this.snackText = e[x]
          this.snackbar = true
          this.snacktype = 'warning'
        }
      },
      returnCount: function (e) {
        console.log(e)
        switch (e) {
          case 31:
            this.snackText = 'Kayıt Başarılı!'
            this.snackbar = true
            this.snacktype = 'success'
            this.getData()
            break
        }
      }
    },
    data() {
      return {
        snackbar: false,
        snackText: 'Bir hata ile karşılaşıldı.',
        snacktype: 'warning',
        timeout: 2500,
        apertmentData: JSON.parse(localStorage.getItem('myApertment'))
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>
