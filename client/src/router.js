import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import Add from './views/Add.vue'
import Register from './views/Register.vue'
import Cart from './views/Cart.vue'
import Detail from './views/Detail.vue'
import Orders from './views/Orders.vue'
import TransactionDetail from './views/TransactionDetail.vue'
import Edit from './views/Edit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: TransactionDetail
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    }
  ]
})
