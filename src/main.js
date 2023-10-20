import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueRouter from 'vue-router'
import router from './routes'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios';
Vue.use(VueSweetalert2);
Vue.prototype.$axios=axios;
Vue.use(VueRouter)
axios.defaults.baseURL="https://crudcrud.com/api/9bcbff50d94a40e784ce0db346f513ef";

Vue.config.productionTip = false

new Vue({
  router:router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
