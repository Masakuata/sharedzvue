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
    path: '/eddit-customer/:id',
    name: 'editcustomer',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/addcustomer/EditCustomer.vue')
    }
  },

  {
    path: '/detail-customer/:id',
    name: 'detailcustomer',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/addcustomer/DetailCustomer.vue')
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
    path: '/sale/details/:id',
    name: 'salesdetails',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/sales/DetalleVenta.vue')
    }
  },

  {
    path: '/add-product',
    name: 'addproduct',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/inventory/addProduct/AddProduct.vue')
    }
  },

  {
    path: '/edit-product/:id',
    name: 'editproduct',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/inventory/editproduct/EditProductMain.vue')
    }
  },

  {
    path: '/modify-stock-product/:id',
    name: 'modifystockproduct',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/inventory/modifystock/ModifyStockMain.vue')
    }
  },

  {
    path: '/reports',
    name: 'reports',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/reports/ReportsMain.vue')
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/contact/MainContact.vue')
    }
  },
  {
    path: '/sale/print/:id',
    name: 'print',
    component: function () {
      return import(/* webpackChunkName: "identificate" */ '../views/printNote/PrintNote.vue')
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
