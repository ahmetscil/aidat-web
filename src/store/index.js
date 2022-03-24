import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '../router'
Vue.use(VueAxios, axios)
Vue.use(Vuex)
let authToken = ''
if (localStorage.getItem('authUser')) {
  const ls = JSON.parse(localStorage.getItem('authUser'))
  authToken = ls.token
} else {
  authToken = ''
}
const apiHeaders = {
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${authToken}`
  }
}
const baseURL = 'https://aidatapi.canvasteknoloji.com/api/'

export default new Vuex.Store({
  state: {
    authuser: {
      isLogined: false,
      username: '',
      realname: '',
      email: ''
    },
    summary: {
      title: 'Özet',
      apertment: 'Oya Apartmanı',
      content: {
        unpaidDues: 663.56,
        totalOfInvoices: 326.53,
        totalPayments: 12.531,
        thingsToDoThisMonth: {}
      }
    },
    returnCount: 0,
    errorMessage: null,
    isLoading: false,
    user_apertments: [],
    user_orders: []
  },
  mutations: {
    SET_RETURN (state, payload) {
      state.returnCount = payload
      console.log(state.returnCount)
    },
    SET_ERROR (state, payload) {
      state.errorMessage = payload
    },
    SET_LOADING (state, payload) {
      state.isLoading = payload
    },
    SET_LOGOUT () {
      localStorage.clear()
      router.push({ name: 'Giris' })
    },
    SET_LOGIN (state, payload) {
      localStorage.setItem('authUser', JSON.stringify(payload))
      if (localStorage.getItem('authUser')) {
        const usr = JSON.parse(localStorage.getItem('authUser'))
        state.authuser.isLogined = usr.isLogined
        state.authuser.username = usr.username
        state.authuser.realname = usr.realname
        state.authuser.email = usr.email
      } else {
        state.authuser.isLogined = false
        state.authuser.username = ''
        state.authuser.realname = ''
        state.authuser.email = ''
      }
    },
    authControl (state) {
      if (localStorage.getItem('authUser')) {
        const usr = JSON.parse(localStorage.getItem('authUser'))
        state.authuser.apertments = usr.apertments
        state.authuser.token = usr.token
        state.authuser.user = usr.user
        state.authuser.isLogined = usr.isLogined
        state.authuser.username = usr.username
        state.authuser.realname = usr.realname
        state.authuser.email = usr.email
      } else {
        router.push({ name: 'Giris' })
      }
    },
    user_apertments (state, payload) {
      state.user_apertments = payload
    },
    user_orders (state, payload) {
      state.user_orders = payload
    },
    set_apertment (state, payload) {
      state.summary.apertment = payload.apertmentName
      localStorage.setItem('myApertment', JSON.stringify(payload))      
    }
  },
  actions: {
    authRegister ({ commit }, send) {
      const usr = {
        name: send.form.name,
        email: send.form.email,
        password: send.form.password
      }
      commit('SET_LOADING', true)
      commit('SET_RETURN', 0)
      axios.post(`${baseURL}auth/register`, usr)
      .then(res => {
        commit('SET_LOADING', false)
        switch (res.data.status) {
          case 201:
            commit('SET_RETURN', 1)
            commit('SET_ERROR', null)
            break
          default:
            commit('SET_RETURN', 3)
            commit('SET_ERROR', res.data.errors)
            break
        }
      })
      .catch(err => {
        commit('SET_ERROR', err.response.data.message)
        commit('SET_LOADING', false)
      })
    },
    authLogin ({ commit }, send) {
      commit('SET_RETURN', 0)
      commit('SET_LOADING', true)
      const usr = {
        email: send.form.email,
        password: send.form.password
      }
      axios.post(`${baseURL}auth/login`, usr)
      .then(res => {
        commit('SET_LOADING', false)
        let userdata = {}
        switch (res.data.status) {
          case 200:
            userdata = {
              apertments: res.data.data.apertments,
              token: res.data.data.token,
              user: res.data.data.user,
              isLogined: true,
              username: res.data.data.user.name,
              realname: res.data.data.user.name,
              email: res.data.data.user.email
            }
            commit('SET_LOGIN', userdata)
            if (res.data.data.apertments.length <= 0) {
              commit('SET_RETURN', 22)
            } else {
              commit('SET_RETURN', 21)
            }
            break
        
          default:
            console.log(res.data)
            break;
        }
      })
      .catch(err => {
        commit('SET_ERROR', err.response.data.message)
        commit('SET_LOADING', false)
      })
    },
    create_order ({ commit }, data) {
      commit('SET_RETURN', 0)
      commit('SET_LOADING', true)
      axios.post(`${baseURL}order`, data.form, apiHeaders)
      .then(res => {
        commit('SET_LOADING', false)
        console.log(res.data)
        switch (res.data.status) {
          case 201:
            commit('SET_RETURN', 31)
            break
          default:
            commit('SET_ERROR', res.data.errors)
            break
        }
      })
      .catch(err => {
        commit('SET_ERROR', err.response.data.message)
        commit('SET_LOADING', false)
      })
    },
    create_apertment ({ commit }, data) {
      commit('SET_RETURN', 0)
      commit('SET_LOADING', true)
      axios.post(`${baseURL}apertment`, data.form, apiHeaders)
      .then(res => {
        commit('SET_LOADING', false)
        switch (res.data.status) {
          case 201:
            commit('SET_RETURN', 31)
            break
          default:
            commit('SET_ERROR', res.data.errors)
            break
        }
      })
      .catch(err => {
        commit('SET_ERROR', err.response.data.message)
        commit('SET_LOADING', false)
      })
    },
    create_uap ({ commit }, data) {
      commit('SET_RETURN', 0)
      commit('SET_LOADING', true)
      axios.post(`${baseURL}user-apertment-merge`, data.form, apiHeaders)
      .then(res => {
        commit('SET_LOADING', false)
        switch (res.data.status) {
          case 201:
            commit('SET_RETURN', 41)
            break
          default:
            commit('SET_ERROR', res.data.errors)
            break
        }
      })
      .catch(err => {
        commit('SET_ERROR', err.response.data.message)
        commit('SET_LOADING', false)
      })
    },
    get_apertment ({ commit }, data) {
      commit('SET_RETURN', 0)
      commit('SET_LOADING', true)
      axios.get(`${baseURL}user-apertment-merge${data.query}`, apiHeaders)
      .then(res => {
        commit('SET_LOADING', false)
        switch (res.data.status) {
          case 200:
            commit('user_apertments', res.data.data)
            break
          default:
            commit('SET_ERROR', res.data.errors)
            break
        }
      })
      .catch(err => {
        commit('SET_ERROR', err.response.data.message)
        commit('SET_LOADING', false)
      })
    },
    get_orders ({ commit }, data) {
      commit('SET_RETURN', 0)
      commit('SET_LOADING', true)
      axios.get(`${baseURL}order${data.query}`, apiHeaders)
      .then(res => {
        commit('SET_LOADING', false)
        switch (res.data.status) {
          case 200:
            commit('user_orders', res.data.data)
            break
          default:
            commit('SET_ERROR', res.data.errors)
            break
        }
      })
      .catch(err => {
        commit('SET_ERROR', err.response.data.message)
        commit('SET_LOADING', false)
      })
    }
  },
  modules: {
  }
})
