import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	clientCategory: ''
  },
  mutations: {
  	clientChanged(state, value) {
  		state.clientCategory = value
  	} 
  },
  actions: {

  }
})