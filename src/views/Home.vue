<template>
  <div>
    <div class="header">
      <button
        type="button"
        class="btn btn-primary btn--mod"
        @click="moveToStats"
        v-if="isAdmin"
      >
        CheckIn
        <i class="fas fa-list" style="color:white"></i>
      </button>
      <button class="btn btn-dark btn--mod" @click="moveToAdmin" v-if="isAdmin">
        Admin
        <i class="fas fa-lock" style="color:white"></i>
      </button>
      <div id="right-header-area">
        <p id="time">{{ temperature }}</p>
        <i class="fas fa-sign-out-alt" id="logout" @click="logout"></i>
      </div>
    </div>
    <div class="router-body">
      <transition name="fade" mode="out-in">
        <router-view @errorOccured="showError"></router-view>
      </transition>
    </div>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="alert-primary alert--mod" role="alert" v-if="errorOccured">
        {{ errorStatus }}
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  created() {
    let auth = axios.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["Authorization"];
    axios
      .get(
        "http://api.weatherstack.com/current?access_key=cdeb8a40d1c3e91756163e7f7c09048d&query=Belgrade" )
      .then(({ data }) => {
        this.temperature =
          data.location.name + " temperature: " + data.current.temperature + "°C";
      });
    axios.defaults.headers.common["Authorization"] = auth;
  },
  computed: {
    ...mapState(["errorOccured", "errorStatus", "isAdmin"])
  },
  data() {
    return {
      temperature: ""
    };
  },
  methods: {
    ...mapMutations(["unsetUser"]),
    showError() {
      this.errorOccured = true;
    },
    moveToAdmin() {
      this.$router.push("/admin");
    },
    moveToStats() {
      this.$router.push("/home");
    },
    logout() {
      delete axios.defaults.headers.common["Authorization"];
      this.unsetUser();
      this.$router.push("/");
    }
  }
};
</script>
