import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    errorOccured: false,
    errorStatus: "",
    user: null,
    isAdmin: null
  },
  mutations: {
    showError(state) {
      state.errorOccured = true;
    },
    hideError(state) {
      state.errorOccured = false;
    },
    setErrorText(state, payload) {
      state.errorStatus = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setUser2(state, payload) {
      state.user = payload;
    },
    unsetUser(state) {
      state.user = null;
      state.isAdmin = null;
    },
    setAdminStatus(state, payload) {
      state.isAdmin = payload;
    },
    setAdminStatus2(state, payload) {
      state.isAdmin = payload;
    }
  },
  actions: {
    errorAppeared(context, payload) {
      context.commit("setErrorText", payload);
      context.commit("showError");
      setTimeout(function() {
        context.commit("hideError");
      }, 3000);
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  }
});
