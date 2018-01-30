import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';

import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(ElementUI, { locale })
locale.use(lang)

import AppLayout from './AppLayout.vue';
import home from './home.vue';
import Students from './Students.vue';
import StudentNew from './StudentNew.vue';
import StudentEdit from './StudentEdit.vue';
import Products from './Products.vue';
import ProductNew from './ProductNew.vue';
import ProductEdit from './ProductEdit.vue';


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },

    // Student Form
    {
      path: '/Students',
      name: 'Students',
      component: Students,
    },
    {
      path: '/NewStudent',
      name: 'StudentNew',
      component: StudentNew,
    },
    {
      path: ':_id/EditStudent',
      name: 'StudentEdit',
      params: ['_id'],
      component: StudentEdit,
    },

    // Product Form
    {
      path: '/Products',
      name: 'Products',
      component: Products,
    },
    {
      path: '/NewProduct',
      name: 'ProductNew',
      component: ProductNew,
    },
    {
      path: ':_id/EditProduct',
      name: 'ProductEdit',
      params: ['_id'],
      component: ProductEdit,
    },
  ]
});


Meteor.startup(() => {
  new Vue({
    router,
    ...AppLayout,
  }).$mount('app');
});