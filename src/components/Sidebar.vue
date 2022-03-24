<template>
  <v-sheet rounded="lg">
    <v-list color="transparent">
      <v-list-item v-for="(nav, n) in authnav" :key="n" link>
        <v-list-item-content>
          <v-list-item-title>
            <router-link :to="{ name: nav.href }">
              {{ nav.text }}
            </router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="my-2"></v-divider>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>
            <router-link :to="{ name: 'YeniApartman' }">
              Yeni Apartman
            </router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title>
            <router-link :to="{ name: 'Apartmanlarim' }">
              Apartmanlarım
            </router-link>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
  export default {
    name: 'Sidebar',
    data: () => ({
      authnav: [
        { text: 'Ana Sayfa', href: 'Ozet' },
        { text: 'Gelir - Gider', href: 'GelirGider' },
        { text: 'Aidat', href: 'Aidat' },
        { text: 'Ahali', href: 'Ahali' }
      ]
    })
  }
</script>
