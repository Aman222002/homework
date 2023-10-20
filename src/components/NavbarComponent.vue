<template>
  <nav class="nav">

    <router-link to="/">
      <v-btn>Home</v-btn>
    </router-link>
    <router-link to="/register" v-if="!isLogin">
      <v-btn>Registration</v-btn>
    </router-link>
    <router-link to="/login" v-if="!isLogin">
      <v-btn>Login</v-btn>
    </router-link>
    <router-link to="/userview" v-if="isLogin">
      <v-btn>UserView</v-btn>
    </router-link>
    <router-link to="/about">
      <v-btn>About</v-btn>
    </router-link>
    <v-btn @click="logout()" color="red" v-if="isLogin">Logout</v-btn>
  </nav>
</template>
<script>
export default {
  mounted() {
    const isLoggedIn = localStorage.getItem('isLogin');
    this.isLogin = isLoggedIn && isLoggedIn == '1';
  },
  data() {
    return {
      isLogin: false
    }
  },
  methods: {
    logout() {
      this.isLogin = false;
      localStorage.setItem("isLogin", 0);
      console.log(localStorage.getItem("isLogin"));
      window.location.href = "http://localhost:8080/#/";
    },
  },
};
</script>
<style>
.nav {
  background-color: aqua;
  height: 130px;
  justify-content: space-between;


}
</style>

