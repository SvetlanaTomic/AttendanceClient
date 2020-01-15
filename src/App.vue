<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>


#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  // font-family: "Ubuntu", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: yy100%;
  width: 100%;
}

body {
  background-image: url(./assets/background.jpg);
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
