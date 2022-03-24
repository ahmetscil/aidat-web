<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">
        <v-img
          alt="Aidat"
          class=""
          contain
          src="@/assets/aidatLogo.png"
          transition="scale-transition"
          height="50"
        />
      </v-col>
      <v-col cols="10" class="text-right">
        <v-card flat>
          <v-card-text>
            {{copyright}}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Header',
    data: () => ({
      copyright: 'aidat.app | 2021'
    }),
    computed: mapState(['authuser']),
    mounted() {
    },
    methods: {
    }
  }
</script>
