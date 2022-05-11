import Vue from 'vue';
import VueMaskRu from 'v-mask-ru';
import App from './App.vue';
import store from './store';

Vue.use(VueMaskRu);
Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
