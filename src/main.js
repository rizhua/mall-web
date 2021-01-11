import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/font/iconfont.css';
import './assets/style.less';

// Vue.use(axios);
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

// 货币过滤
Vue.filter('curreny', function (value) {
  const tempVal = Number(value).toFixed(3);
  if (tempVal === "NaN") {
    return 0.00;
  }
  const realVal = tempVal.substring(0, tempVal.length - 1);
  return realVal;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
