<template>
  <div class="home">
    <login id="login-panel"></login>
  </div>
</template>

<script>
import Login from "@/components/LoginCard.vue";

export default {
  components: {
    Login
  }
};
</script>

<style lang="scss">
#login-panel {
  margin-top: 10%;
}
</style>
