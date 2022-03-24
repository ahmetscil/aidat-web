<template>
  <v-row v-if="authuser.isLogined">
    <v-col cols="2">
      <Sidebar />
    </v-col>
    <v-col cols="10">
      <v-item-group>
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <h1>{{summary.apertment}}</h1>
              <h2>Hoş geldin {{authuser.realname}}</h2>
            </v-col>
            <v-col cols="12" md="6">
              <v-card light flat>
                <v-card-title>{{summary.title}}</v-card-title>
                <v-list class="transparent">
                  <v-list-item>
                    <v-list-item-title>
                      Ödenmemiş Aidatlarım
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-right">
                      {{ summary.content.unpaidDues }}
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      Faturalar Toplamı
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-right">
                      {{ summary.content.totalOfInvoices }}
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>
                      Toplam Ödemeler
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-right">
                      {{ summary.content.totalPayments }}
                    </v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card light flat>
                <v-card-title>Bu Ay Yapılacaklar</v-card-title>
                <v-list class="transparent">
                  <v-list-item v-if="summary.content.thingsToDoThisMonth.length">
                    <v-list-item-title>
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-right">
                    </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item v-else>
                    <v-list-item-title>
                      Etkinlik Bulunamadı
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </v-col>
  </v-row>
</template>
<script>
  import { mapState } from 'vuex'
  import Sidebar from '../components/Sidebar'
  export default {
    name: 'Home',
    components: {
      Sidebar
    },
    computed: mapState(['authuser', 'summary']),
    data() {
      return {
      }
    },
  }
</script>
