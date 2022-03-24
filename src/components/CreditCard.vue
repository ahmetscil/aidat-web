<template>
  <v-card>
    <v-card-title class="blue darken-1 white--text font-weight-black title">
      KREDİ KARTI İLE ÖDEME<v-spacer />
      <v-img aspect-ratio="3.075" max-height="40" :src="image" position="right" contain />
    </v-card-title>
    <v-card-text class='pb-10'>
      <v-row>
        <v-col cols='6'>
          <v-subheader class="grey--text text--lighten-1 pl-0 subheader">Kart Sahibi</v-subheader>
          <v-text-field single-line outlined label="Johny Relative" hide-details />
        </v-col>
        <v-col cols='6'>
          <v-subheader class="grey--text text--lighten-1 pl-0 subheader">Kart Numarası</v-subheader>
          <v-text-field single-line outlined mask="credit-card" v-model="valueOfCardNumber" placeholder="_ _ _ _  _ _ _ _  _ _ _ _  _ _ _ _" hide-details />
        </v-col>
        <v-col col='4'>
          <v-subheader class="grey--text text--lighten-1 pl-0 subheader">Son Kullanım Tarihi</v-subheader>           
          <v-select :items="MonthList" label="Ay" outlined append-icon='mdi-keyboard_arrow_down' hide-details />
        </v-col>
        <v-col col='4'>
          <v-subheader class="grey--text text--lighten-1 pl-0 subheader"></v-subheader>                   
          <v-select :items="YearList" label="Yıl" outlined append-icon='mdi-keyboard_arrow_down' hide-details />
        </v-col>
        <v-col col='4'>
          <v-subheader class="grey--text text--lighten-1 pl-0 subheader">CVV</v-subheader>             
          <v-text-field single-line outlined hide-details/>  
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
const URL_IMAGE = 'https://i.imgur.com/lY1wk82.png';
const years = []
for (let y = 2021; y <= 2031; y++) {
  years.push(y)
  
}
export default {
  data() {
    return {
      creditCardForm: {
        holder: '',
        number: 0,
        month: 0,
        year: 0,
        cvv: 0
      },
      image: URL_IMAGE,
      YearList:  years,
      MonthList:  ['OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN', 'TEMMUZ', 'AĞUSTOS', 'EYLÜL', 'EKİM', 'KASIM', 'ARALIK'],
      valueOfCardNumber: ''
    }
  }
}
</script>
<style lang="scss">
</style>