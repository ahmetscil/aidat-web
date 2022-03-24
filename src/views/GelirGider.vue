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
                <v-col cols="12" md="6">
                  <h1>Gelir-Gider</h1>
                  <h2>{{apertmentData.apertmentName}} Ödemelerim</h2>
                  <v-sheet v-if="isLoading" class="pa-3">
                    <v-skeleton-loader class="mx-auto" type="article" />
                    <v-skeleton-loader class="mx-auto" type="article" />
                    <v-skeleton-loader class="mx-auto" type="article" />
                    <v-skeleton-loader class="mx-auto" type="article" />
                  </v-sheet>
                  <v-card v-for="(order, o) in user_orders" :key="'ord' + o" light flat class="mb-3">
                    <v-card-title><small><kbd>{{ parseInt(order.order_type) == 1 ? 'Aidat' : 'Diğer' }}</kbd></small>&nbsp;&nbsp;&nbsp;{{ order.title }}</v-card-title>
                    <v-card-text>{{ order.content }}</v-card-text>
                    <v-card-text>Tutar: {{ order.amount }}₺</v-card-text>
                    <v-card-text v-if="status == 1">Durum: Ödenmedi</v-card-text>
                    <v-card-text v-if="status == 0">Durum: Tamamlandı</v-card-text>
                    <!-- <v-card-actions>
                      <v-btn color="secondary" block>
                        Öde
                      </v-btn>
                    </v-card-actions> -->
                  </v-card>
                </v-col>
                <v-col v-if="apertmentData.manager == 1" cols="12" md="6">
                  <h1>Gelir-Gider</h1>
                  <h2>{{apertmentData.apertmentName}} için yeni gider</h2>
                  <v-card light flat>
                    <v-text-field v-model="form.title" label="Gider Başlığı" required />
                    <v-select v-model="form.order_type" :items="selectDuesType" item-text="label" item-value="value" label="Gider Tipi" required />
                    <v-select v-model="form.payment_type" :items="selectPaymentType" item-text="label" item-value="value" label="Kim Öder" required />
                    <v-text-field v-model="form.amount" label="Bedel" required />
                    <v-text-field v-model="form.content" label="Açıklama" required />
                    <v-menu v-model="showPicker" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.last_date"
                          label="Son Ödeme Günü"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.last_date"
                        @input="showPicker = false"
                      ></v-date-picker>
                    </v-menu>
                    <v-card-actions>
                      <v-btn color="secondary" block @click="submitForm()" :disabled="isDisabled">
                        Gider Kaydını Oluştur
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
    name: 'GelirGider',
    components: {
      Sidebar
    },
    computed: mapState(['authuser', 'returnCount', 'user_orders', 'errorMessage', 'isLoading']),
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
            this.isDisabled = false
            this.snacktype = 'success'
            this.getData()
            break
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
        apertmentData: JSON.parse(localStorage.getItem('myApertment')),
        showPicker: false,
        selectDuesType: [
          { label: 'Genel Aidat', value: 1 },
          { label: 'Beklenmedik Gider', value: 2 }
        ],
        selectPaymentType: [
          { label: 'Mülk Sahibi', value: 1 },
          { label: 'Daire Sakini', value: 2 }
        ],
        form: {
          unit_type:1,
          photo: '',
          status:1,
          title: '',
          order_type: '',
          payment_type: '',
          amount: '',
          content: '',
          last_date: new Date().toISOString().substr(0, 10),
          apertment: JSON.parse(localStorage.getItem('myApertment')).id
        }
      }
    },
    mounted () {
      this.getData()
    },
    methods: {
      getData () {
        this.$store.dispatch('get_orders', {...this.data, query: `?apertment=${JSON.parse(localStorage.getItem('myApertment')).id}`})
      },
      submitForm () {
        this.isDisabled = true
        this.$store.dispatch('create_order', {...this.data, form: this.form})
      }
    }
  }
</script>
