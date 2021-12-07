import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state : {
        counter : 1000,
        deleteModalObj : {
            showDeleteModal: false,
            deleteUrl : '',
            data : null,
            deletingIndex: -1,

        }
    },

    getters:{
        getDeleteModalObj(state){
            return state.getDeleteModalObj
        }
    },

    mutations: {
        changeTheCounter(state, data){
            state.counter += data
        }
    }
})
