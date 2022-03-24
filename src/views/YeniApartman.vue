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
                  <h1>Yeni Apartman Oluştur</h1>
                  <h2>Yönetici: {{authuser.realname}}</h2>
                  <h5>veya <router-link :to="{ name: 'Apartmanlar' }">Bir Apartmana Katılın</router-link></h5>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card light flat>
                    <v-card-title>Apartman Bilgileri</v-card-title>
                    <v-text-field v-model="form.code" label="Apartman Kodu" required />
                    <v-text-field v-model="form.title" label="Apartman İsmi" required />
                    <v-text-field v-model="form.city" label="Şehir" required />
                    <v-text-field v-model="form.district" label="İlçe" required />
                    <v-text-field v-model="form.neighborhood" label="Mahalle" required />
                    <v-text-field v-model="form.street" label="Cadde / Sokak" required />
                    <v-text-field v-model="form.no" label="No" required />
                  </v-card>
                  <v-card light flat class="mt-5">
                    <v-card-title>Ödeme Bilgileri</v-card-title>
                    <v-text-field v-model="form.dues" label="Aidat" required />
                    <v-text-field v-model="form.bank_name" label="Banka" required />
                    <v-text-field v-model="form.bank_branch" label="Banka Şubesi" required />
                    <v-text-field v-model="form.bank_IBAN" label="IBAN" required />
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card light flat>
                    <v-card-title>Daireler</v-card-title>
                    <v-text-field v-model="form.managerFlat" label="Yönetici hangi dairede yaşıyor ?" required />
                    <v-text-field v-model="form.flats" label="Apartmanda Kaç Daire Var ?" required />
                    <div v-for="x in parseInt(form.flats)" :key="x">
                      <v-text-field :label="'Daire ' + x + ' Aidat'" :id="'flet' + x" value="" />
                    </div>
                  </v-card>
                  <v-card light flat>
                    <v-btn color="success" class="mr-4" block @click="submitForm" :disabled="isDisabled">Apartman Oluştur</v-btn>
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
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import Sidebar from '../components/Sidebar'
  export default {
    name: 'YeniApartman',
    mixins: [validationMixin],
    validations: {
      form: {
        code: { required },
        title: { required },
        city: { required },
        district: { required },
      }
    },
    components: {
      Sidebar
    },
    computed: mapState(['authuser', 'summary', 'returnCount', 'errorMessage']),
    watch: {
      returnCount: function (e) {
        switch (e) {
          case 31:
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
          type: 2,
          buildings: '',
          flats: 0,
          flat_price: [],
          code: '',
          title: '',
          city: '',
          district: '',
          neighborhood: '',
          street: '',
          no: '',
          payment_unit: 'm2',
          unit_price: '',
          dues: '',
          dues_type: 1,
          dues_interest: 0,
          dues_date: 1,
          managerFlat: 0,
          manager: 1,
          serviceman: 0,
          bank_name: '',
          bank_branch: '',
          bank_IBAN: '',
          status: 2
        },
        selectDuesType: [
          { label: 'Sabit Aidat', value: 1 },
          { label: 'Değişken Aidat', value: 2 }
        ]
      }
    },
    methods: {
      submitForm () {
        this.isDisabled = true
        let dt = {}
        for (let f = 0; f < this.form.flats; f++) {
          const flt = 'flet' + (f + 1)
          const val = document.getElementById(flt).value
          dt = {
            flat: f + 1,
            value: 1,
            amount: val
          }
          this.form.flat_price.push(dt)
        }
        this.$v.form.$touch()
        if (this.$v.$error) {
          this.snackText = 'Lütfen tüm zorunlu alanları doldurun'
          this.isDisabled = false
          this.snackbar = true
          this.snacktype = 'warning'
        } else {
          this.snackbar = false
          this.$store.dispatch('create_apertment', {...this.data, form: this.form})
        }
      }
    }
  }
</script>
