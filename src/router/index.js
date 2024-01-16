import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'identificate',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/identificate/MainIdentificate.vue')
    }
  },

  {
    path: '/home',
    name: 'home',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/home/Home.vue')
    }
  },
  {
    path: '/add-customer',
    name: 'addcustomer',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/addcustomer/MainAddCustomer.vue')
    }
  },
  {
    path: '/add-customer/create-customer',
    name: 'createcustomer',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/addcustomer/AddCustomer.vue')
    }
  },
  {
    path: '/add-note',
    name: 'addnote',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/addnote/AddNote.vue')
    }
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/inventory/Inventory.vue')
    }
  },

  {
    path: '/sales',
    name: 'sales',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/sales/Sales.vue')
    }
  },
  {
    path: '/add-product',
    name: 'addproduct',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/inventory/addProduct/AddProduct.vue')
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
