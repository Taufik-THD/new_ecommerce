import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    isLogin: false,
    allItem: null,
    detailItem: null,
    transaction: null,
    detailTransaction: null,
    editItemData: null
  },
  mutations: {
    add (state, addCart) {
      let checkItem = 0
      state.cart.forEach(value => {
        if (value._id == addCart._id) {
          checkItem += 1
        }
      })
      if (checkItem == 0) {
        addCart.qty = 1
        state.cart.push(addCart)
      } else {
        for (let i = 0; i < state.cart.length; i++) {
          if (state.cart[i]._id == addCart._id) {
            addCart.qty += 1
          }
        }
      }
    },
    isLoginProcess (state, loginChange) {
      if (state.isLogin == true) {
        state.isLogin = false
      } else {
        state.isLogin = true
      }
    },
    removeCart (state, removeAllCart) {
      const newCart = []
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i]._id != removeAllCart._id) {
          newCart.push(state.cart[i])
        }
      }
      state.cart = newCart
    },
    getAllitems (state, getItems) {
      state.allItem = getItems
    },
    getDetailItem (state, getDetail) {
      state.detailItem = getDetail
    },
    addItemQty (state, addQty) {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].qty != state.cart[i].stock) {
          if (state.cart[i]._id == addQty._id) {
            const item = state.cart[i];
            const qty = item.qty + 1;
            const updatedItemQty = { ...state.cart[i], qty };
            state.cart.splice(i, 1, updatedItemQty);
          }
        }
      }
    },
    minItemQty (state, minQty) {
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart[i].qty != 1) {
          if (state.cart[i]._id == minQty._id) {
            const item = state.cart[i];
            const qty = item.qty - 1;
            const updatedItemQty = { ...state.cart[i], qty };
            state.cart.splice(i, 1, updatedItemQty);
          }
        }
      }
    },
    remove (state, removeCart) {
      state.cart = []
    },
    transaction (state, getTransaction) {
      state.transaction = getTransaction
    },
    detailTransaction (state, getDetailTransaction) {
      state.detailTransaction = getDetailTransaction
    },
    edit (state, editItem) {
      state.editItemData = editItem
    }
  },
  actions: {
    addCart ({ commit }, payload) {
      commit('add', payload)
    },
    loginChange ({ commit }, payload) {
      commit('isLoginProcess')
    },
    removeAllCart ({ commit }, payload) {
      commit('removeCart', payload)
    },
    getItems ({ commit }, payload) {
      commit('getAllitems', payload)
    },
    getDetail ({ commit }, payload) {
      commit('getDetailItem', payload)
    },
    addQty ({ commit }, payload) {
      commit('addItemQty', payload)
    },
    minQty ({ commit }, payload) {
      commit('minItemQty', payload)
    },
    removeCart ({ commit }, payload) {
      commit('remove', payload)
    },
    getTransaction ({ commit }, payload) {
      axios({
        method: 'get',
        url: 'http://35.240.238.226/gettransaction'
      }).then(data => {
        console.log(data);
        commit('transaction', data.data)
      }).catch(err => {
        console.log(err);
      })
    },
    getDetailTransaction ({commit}, payload) {
      commit('detailTransaction', payload)
    },
    editItem ({commit}, payload) {
      commit('edit', payload)
    }
  },
})
