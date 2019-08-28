import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    valueTodo: '',
    blur: null,
    todos: []
  },
  mutations: {
    valueTodo (state, value) {
      state.valueTodo = value
    }
  },
  actions: {

  }
})
