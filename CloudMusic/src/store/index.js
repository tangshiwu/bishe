import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    status:true
  },
  getters:{},
  mutations:{
    turnStatus(state){
      state.status = false
    }
  },
  actions:{},
  modules:{}
})
