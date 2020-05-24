import Vue from 'vue';
import Dev from './serve.vue';
import VueTextareaAutosize from 'vue-textarea-autosize'

Vue.config.productionTip = false;

Vue.use(VueTextareaAutosize)

new Vue({
  render: (h) => h(Dev),
}).$mount('#app');
