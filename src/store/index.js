import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    colors: 3,
    colorCommand: null
  },
  mutations: {
    addColor(state) {
      state.colors++
    },
    removeColor(state) {
      state.colors--
    },
    colorCommandsIndex(state, index) {
      state.colorCommand = index
    }
  },
  actions: {},
  modules: {}
})
