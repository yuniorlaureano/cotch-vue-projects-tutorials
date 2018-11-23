<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ul>
      <li>
          <router-link to='/'>Home</router-link>
      </li>
      <li>
          <router-link to='/about'>About</router-link>
          <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
      </li>
      <li>
          <router-link to='/secure'>Secure</router-link>
      </li>
      <li>
          <router-link to='/login'>Login</router-link>
      </li>
      <li>
          <router-link to='/register'>Register</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed:{
    isLoggedIn: function(){
      return this.$store.getters.isLoggedIn;
    }
  },
  methods:{
    logout: function(){
      this.$store.dispatch('logout').then(()=>{
        this.$router.push('/login');
      });
    }
  },
  created: function(){
      this.$http.interceptors.response.use(undefined, function(err){
        return new Promise(function(resolve, reject){
            if (err.status == 401 && err.config && !err.config.__isRetryRequest) {
              this.$store.dispatch('logout');
            }
            throw err;
        });
      });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
