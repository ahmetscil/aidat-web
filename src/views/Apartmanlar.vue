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
                  <h1>Bir Apartmana Katılın</h1>
                  <h2>Kat Sakini: {{authuser.realname}}</h2>
                  <h5>veya <router-link :to="{ name: 'YeniApartman' }">Yeni bir apartman oluşturun</router-link></h5>
                </v-col>
                <v-col cols="12" md="4">
                  <v-card light flat>
                    <v-card-title>Apartmanları ara</v-card-title>
                    <v-text-field v-model="form.code" label="code" />
                    <v-text-field v-model="form.title" label="title" />
                    <v-text-field v-model="form.city" label="city" />
                    <v-text-field v-model="form.district" label="district" />
                    <v-text-field v-model="form.neighborhood" label="neighborhood" />
                    <v-text-field v-model="form.street" label="street" />
                    <v-btn color="success" class="mr-4" block @click="submitForm" :disabled="isDisabled">Apartman Ara</v-btn>
                  </v-card>
                </v-col>
                <v-col cols="12" md="8">
                  <h4>Lütfen katılmak istediğiniz apartmanı seçin</h4>
                  <v-cardlight flat>
                    <v-card-text>
                      <v-text-field v-model="submitApt.flat" label="Daire No" />
                    </v-card-text>
                    <v-card-actions v-for="(ap, a) in user_apertments" :key="'apt' + a" >
                      <v-btn color="secondary" block @click="selectApt(ap)">
                        {{ap.apertmentName}}
                      </v-btn>
                    </v-card-actions>
                  </v-cardlight>
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
    name: 'Apartmanlar',
    components: {
      Sidebar
    },
    computed: mapState(['authuser', 'summary', 'user_apertments', 'returnCount', 'errorMessage']),
    watch: {
      returnCount: function (e) {
        switch (e) {
          case 41:
            this.snackText = 'Kayıt Başarılı!'
            this.snackbar = true
            this.isDisabled = false
            this.snacktype = 'success'
            this.$router.push({ name: 'Apartmanlarim' })
            break
        }
      },
      errorMessage: function (e) {
        this.isDisabled = false
        for (let x = 0; x < e.length; x++) {
          this.snackText = e[x]
          this.snackbar = true
          this.snacktype = 'warning'
        }
      }
    },
    data() {
      return {
        isDisabled: false,
        snackbar: false,
        snackText: 'Bir hata ile karşılaşıldı.',
        snacktype: 'warning',
        timeout: 2500,
        form: {
          user: JSON.parse(localStorage.getItem('authUser')).user.id,
          code: '',
          buildings: '',
          title: '',
          city: '',
          district: '',
          neighborhood: '',
          street: ''
        },
        submitApt: {
          code: JSON.parse(localStorage.getItem('authUser')).user.id + '|' + 0 + '|' + 2,
          user: JSON.parse(localStorage.getItem('authUser')).user.id,
          apartment: 0,
          flat: 0,
          type: 2, // kat sakini
          manager: 0,
          serviceman: 0,
          status: 2
        }
      }
    },
    methods: {
      submitForm () {
        this.isDisabled = true
        this.snackbar = false
        let newq = ''
        if (this.form.code) {
          newq += 'code=' + this.form.code + '&'
        }
        if (this.form.title) {
          newq += 'title=' + this.form.title + '&'
        }
        if (this.form.city) {
          newq += 'city=' + this.form.city + '&'
        }
        if (this.form.district) {
          newq += 'district=' + this.form.district + '&'
        }
        if (this.form.neighborhood) {
          newq += 'neighborhood=' + this.form.neighborhood + '&'
        }
        if (this.form.street) {
          newq += 'street=' + this.form.street + '&'
        }
        this.$store.dispatch('get_apertment', {...this.data, query: '?' + newq})
      },
      selectApt (e) {
        this.submitApt.code = JSON.parse(localStorage.getItem('authUser')).user.id + '|' + e.id + '|' + 2
        this.submitApt.apartment = e.id
        this.$store.dispatch('create_uap', {...this.data, form: this.submitApt})
      }
    }
  }
</script>
