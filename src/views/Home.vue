<template>
  <div>
    <div class="header">
      <button
        type="button"
        class="btn btn-primary btn--mod"
        @click="moveToStats"
        v-if="!isAdmin"
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
import { mapState, mapMutations, mapGetters } from "vuex";

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
    ...mapState(["errorOccured", "errorStatus", "isAdmin"]),    
    ...mapGetters(["getUser"])
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

<style lang="scss" scoped>
.btn--mod {
  margin: 5px;
  margin-left: 1%;
  i {
    margin-left: 2px;
  }
}

#logout:hover {
  cursor: pointer;
  color: grey !important;
}

.header {
  text-align: left;
  background-color: rgba(151, 177, 219, 0.2);
  display: block;
  height: 50px;
  #right-header-area {
    display: inline-flex;
    float: right;
    vertical-align: middle;
    margin-right: 2%;
    margin-top: 10px;
    border-radius: 5%;
    i {
      color: white;
      font-size: 25px;
      margin-left: 30px;
    }
  }
}

.router-body {
  width: 100%;
  height: 100%;
  //   display: flex;
  //   justify-content: center;
  margin-top: 2%;
}
.alert--mod {
  margin-right: 40px;
  width: 300px;
  position: fixed;
  bottom: 20px;
  right: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  transition: opacity 0.3s;
}
</style>
