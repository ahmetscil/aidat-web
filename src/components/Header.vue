<template>
  <v-app-bar app color="white" flat>
    <v-container class="py-0 fill-height">
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
          <v-menu
            v-if="authuser.isLogined"
            min-width="200px"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                x-large
                v-on="on"
              >
                <span class="">{{ authuser.username }}</span>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar color="secondary">
                    <span class="white--text headline">{{ authuser.username }}</span>
                  </v-avatar>
                  <h3>{{ authuser.realname }}</h3>
                  <p class="caption mt-1">
                    {{ authuser.email }}
                  </p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded block text>
                    Hesabım
                  </v-btn>
                  <v-btn depressed rounded block text>
                    Ayarlar
                  </v-btn>
                  <v-btn depressed rounded block text @click="logout">
                    Oturumu Kapat
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'Header',
    computed: mapState(['authuser']),
    mounted() {
      this.controlAuth()
    },
    methods: {
      controlAuth () {
        this.$store.commit('authControl')
      },
      logout () {
        this.$store.commit('SET_LOGOUT')
      }
    }
  }
</script>
