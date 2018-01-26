import { Meteor } from 'meteor/meteor';

import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(VueRouter);

import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import VueRouter from 'vue-router'

Vue.use(ElementUI, { locale })
locale.use(lang)


import AppLayout from './AppLayout.vue';
import home from './home.vue';
import myApp from './myApp.vue';
import MyAppNew from './MyAppNew.vue';
import MyAppEdit from './MyAppEdit.vue';


const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/myApp',
      name: 'myApp',
      component: myApp,
    },
    {
      path: '/New',
      name: 'MyAppNew',
      component: MyAppNew,
    },
    {
      path: ':_id/Edit',
      name: 'MyAppEdit',
      component: MyAppEdit,
    },
  ]
});


Meteor.startup(() => {
  new Vue({
    router,
    ...AppLayout,
  }).$mount('app');
});