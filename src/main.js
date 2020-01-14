import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { ClientTable } from "vue-tables-2";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(ClientTable);

axios.defaults.baseURL = "https://localhost:44346/attendance/api";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
