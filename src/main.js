// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
// 这里引入这些组件
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller  from './components/seller/seller';

// 安装vue-router插件
Vue.use(VueRouter);
// 安装vue-resource插件
Vue.use(VueResource);

let app = Vue.extend(App);

// 实例化一个router
let router = new VueRouter({
  linkActiveClass:'active'
});

// 定义路由
router.map({
  '/goods': {
    component: goods
  },
  '/ratings':{
    component: ratings
  },
  'seller': {
    component: seller
  }
});

// 注入路由
router.start(app, '#app');
// 这里定义一个初始的位置
// router.go('/goods');

