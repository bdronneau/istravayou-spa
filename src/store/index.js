import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    code: null
  }
}
const state = getDefaultState()

export default new Vuex.Store({
  state,
  mutations: {
    setCode (state, code) {
      state.code = code
    },
  },
  actions: {
    resetState (state) {
      // from https://tahazsh.com/vuebyte-reset-module-state
      Object.assign(state, getDefaultState())
    }
  },
  modules: {
  },
  getters: {
    code: state => {
      return state.code
    }
  }
})
