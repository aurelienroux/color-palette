import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    colors: 3
  },
  mutations: {
    addColor(state) {
      state.colors++
    },
    removeColor(state) {
      state.colors--
    }
  },
  actions: {},
  modules: {}
})
