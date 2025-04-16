
import { createStore } from 'vuex'
import emitter from '@/event-bus';
import api from '@/plugins/axios'
import swal from '@/swal';
const store = createStore({
  state() {
    return {
      totalAmount : 0,
      UserId : '',
      Username : ''
    }
  },
  mutations: {
    settotalAmount(state,amount) {
      state.totalAmount = amount
    },
    setUserId(state,id) {
      state.UserId = id
    },
    setUserName(state,name) {
      state.Username = name
    },
  },
  actions: {
      async addSavings({ dispatch }, { userId, amount }) {
        try {
          const totalAmount = amount;
          const params = {
            userId : userId,
            amount: totalAmount
          };
   
              const response = await api.post('/wallet/update',params)
              
        }
          catch(err){
            if(err){
              swal('Server Error!','info')
            }
          }
          finally{
            emitter.emit('savings-updated');
            // swal('Amount updated Successfully','success')
          }
          
        } ,
      async updateSavings({ dispatch }, { userId, amount }) {
        try {
          const totalAmount = amount;
          const params = {
            userId : userId,
            amountToDeduct : totalAmount
          };
          
              const response = await api.post('/wallet/deduct',params)

        }
          catch(err){
            if(err){
              swal('Server Error!','info')
            }
          }
          finally{
            emitter.emit('savings-updated');

          }
          
        } 
      
  },
  getters: {
    isLoggedIn: (state) => !!state.user,
    gettotalAmount: (state) => state.totalAmount,
    getUserId: (state) => state.UserId,
    getname: (state) => state.Username,
  }
})

export default store
