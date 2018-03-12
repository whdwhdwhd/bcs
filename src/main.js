// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import VueContextMenu from 'vue-contextmenu'
import 'vue-contextmenu/style/css/font-awesome.min.css'
import qs from 'qs'

Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
Vue.use(ElementUI);
Vue.use(VueContextMenu);
Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
  var userId="111";
  if(userId){
    next()
  }else{
    if(to.fullPath==="/login"){
      next()
    }else{
      next({
        path: '/login'
      })
    }
    
  }


})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

