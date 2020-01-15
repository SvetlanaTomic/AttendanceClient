<template>
  <div class="wrapper fadeInDown">
    <div id="formContent">
      <!-- Tabs Titles -->
      <!-- Icon -->
      <div class="fadeIn first">
        <i class="fas fa-user" id="logo"></i>
      </div>

      <!-- Login Form -->
     <!-- <form >@submit.prevent="login">-->
        <input
          @click="errorOccured = false"
          type="text"
          id="login"
          class="form-control fadeIn second"
          name="login"
          placeholder="username"
          v-model="username"
        />
        <input
          @click="errorOccured = false"
          type="password"
          id="password"
          class="form-control fadeIn third"
          name="login"
          placeholder="password"
          v-model="password"
        />
        <input type="button" value="User"  @click.prevent="loginUser"/>
            <input type="button" value="Admin"  @click.prevent="loginAdmin"/>
        
      <transition enter-active-class="animated shake">
        <p id="error" v-if="errorOccured">Wrong username or password</p>
      </transition>

    
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jwt from "jsonwebtoken";
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
      errorOccured: false
    };
  },
  methods: {
    ...mapMutations(["setUser", "setAdminStatus"]),
   
    loginAdmin() {
      let credentials = {
        username: this.username,
        password: this.password
      };
      axios
        .post("admins/login", credentials)
        .then(res => {
          let user = jwt.decode(res.data.token);
          this.setUser(user);
          this.setAdminStatus(true);

          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.token;
          this.$router.push("/admin");
        })
        .catch(e => {
          this.errorOccured = !this.errorOccured;
        });
    },
    
     loginUser() {
      let credentials = {
        username: this.username,
        password: this.password
      };
      axios
        .post("users/login", credentials)
        .then(res => {
          let nesto = res.data;
          this.setUser(nesto);
          console.log(nesto);
          this.setAdminStatus(false);

          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.token;
          this.$router.push("/home");
        })
        .catch(e => {
          this.errorOccured = !this.errorOccured;
        });
    }
  }
};
</script>
