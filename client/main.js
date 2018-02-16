import { Meteor } from "meteor/meteor";
import Vue from "vue";
import "element-ui/lib/theme-chalk/index.css";

import ElementUI from "element-ui";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
import VueRouter from "vue-router";
import DataTables from "vue-data-tables";

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(DataTables);
Vue.use(ElementUI, { locale });
locale.use(lang);

import AppLayout from "./AppLayout.vue";
import home from "./home.vue";

// Student
import Students from "./pages/Students.vue";
import StudentNew from "./pages/StudentNew.vue";
import StudentEdit from "./pages/StudentEdit.vue";

// Product
import Products from "./pages/Products.vue";
import ProductNew from "./pages/ProductNew.vue";
import ProductEdit from "./pages/ProductEdit.vue";

// Sales
import Sales from "./pages/Sales.vue";
import SaleNew from "./pages/SaleNew.vue";
import SaleEdit from "./pages/SaleEdit.vue";

// Customers
import Customers from "./pages/Customers.vue";
import CustomerNew from "./pages/CustomerNew.vue";
import CustomerEdit from "./pages/CustomerEdit.vue";

// invoice
import Invoices from "./pages/Invoices.vue";
import InvoiceNew from "./pages/InvoiceNew.vue";
import InvoiceEdit from "./pages/InvoiceEdit.vue";

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: home
    },

    // Student Form
    {
      path: "/Students",
      name: "Students",
      component: Students
    },
    {
      path: "/NewStudent",
      name: "StudentNew",
      component: StudentNew
    },
    {
      path: ":_id/EditStudent",
      name: "StudentEdit",
      params: ["_id"],
      component: StudentEdit
    },

    // Product Form
    {
      path: "/Products",
      name: "Products",
      component: Products
    },
    {
      path: "/NewProduct",
      name: "ProductNew",
      component: ProductNew
    },
    {
      path: ":_id/EditProduct",
      name: "ProductEdit",
      params: ["_id"],
      component: ProductEdit
    },

    // sales
    {
      path: "/Sales",
      name: "Sales",
      component: Sales
    },
    {
      path: "/SaleNew",
      name: "SaleNew",
      component: SaleNew
    },
    {
      path: ":_id/SaleEdit",
      name: "SaleEdit",
      params: ["_id"],
      component: SaleEdit
    },

    // customer
    {
      path: "/Customers",
      name: "Customers",
      component: Customers
    },
    {
      path: "/CustomerNew",
      name: "CustomerNew",
      component: CustomerNew
    },
    {
      path: ":_id/CustomerEdit",
      name: "CustomerEdit",
      component: CustomerEdit
    },

    // Invoice
    {
      path: "/Invoices",
      name: "Invoices",
      component: Invoices
    },
    {
      path: "/InvoiceNew",
      name: "InvoiceNew",
      component: InvoiceNew
    },
    {
      path: ":_id/InvoiceEdit",
      name: "InvoiceEdit",
      component: InvoiceEdit
    }
  ]
});

Meteor.startup(() => {
  new Vue({
    router,
    ...AppLayout
  }).$mount("app");
});
