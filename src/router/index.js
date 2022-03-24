import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/Ozet', name: 'Ozet', component: () => import(/* webpackChunkName: "about" */ '../views/Ozet.vue') },
  { path: '/YeniApartman', name: 'YeniApartman', component: () => import(/* webpackChunkName: "YeniApartman" */ '../views/YeniApartman.vue') },
  { path: '/Apartmanlarim', name: 'Apartmanlarim', component: () => import(/* webpackChunkName: "Apartmanlarim" */ '../views/Apartmanlarim.vue') },
  { path: '/Apartmanlar', name: 'Apartmanlar', component: () => import(/* webpackChunkName: "Apartmanlar" */ '../views/Apartmanlar.vue') },
  { path: '/Aidat', name: 'Aidat', component: () => import(/* webpackChunkName: "Aidat" */ '../views/Aidat.vue') },
  { path: '/GelirGider', name: 'GelirGider', component: () => import(/* webpackChunkName: "GelirGider" */ '../views/GelirGider.vue') },
  { path: '/Giris', name: 'Giris', component: () => import(/* webpackChunkName: "Giris" */ '../views/Giris.vue') },
  { path: '/Kayit', name: 'Kayit', component: () => import(/* webpackChunkName: "Kayit" */ '../views/Kayit.vue') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
