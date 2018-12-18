<template>
  <div id="app">
    <header>
      <nav>
        <ul>
          <li class="nav-item">
            <router-link :to="{name:'Home'}" exact>
              <img class="logo" src="./assets/build-a-bot-logo.png"/>
            Build-a-Bot
          </router-link>
          </li>
           <li class="nav-item cart">
            <router-link to="/build" exact>
            Build
          </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" exact>
            Cart
          </router-link>    
          <div class="cart-items">
            {{cart.length}}
          </div>      
          </li>
        </ul>
      </nav>
    </header>
    <div class="container">
      <aside class="aside">
        <router-view name="sidebar"/>
      </aside>
      <main>
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';

export default {
  name: 'app',
  computed:{
    ...mapState({
      rootFoo: 'foo',
      robotFoo: state => state.robots.foo
    }),
    ...mapGetters({rootGetterFoo: 'foo'}),
    ...mapGetters('robots', {robotsGettersFoo: 'foo'}),
    cart: function(){
      return this.$store.state.robots.cart;
    }
  }
};
</script>

<style>
body {
  background: linear-gradient(to bottom, #555, #999);
  background-attachment: fixed;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
main {
  padding: 30px;
  background-color: white;
  width: 946px;
  min-height: 300px;
}
header {
  background-color: #999;
  width: 1184px;
  margin: 0 auto;
}
ul {
  padding: 3px;
  display: flex;
}
.nav-item {
  display: inline-block;
  padding: 5px 10px;
  font-size: 22px;
  border-right: 1px solid #bbb;
}
.logo {
  vertical-align: middle;
  height: 30px;
}
.router-link-active{
  color: white;
}
.container{
  display: flex;
  margin: 10px auto 0 auto;
  justify-content: center;
}
.nav-item.cart{
  position: relative;
  margin-left: auto;
  border-right: none;
}
.aside{
  padding: 30px;
  background-color: gray;
  width: 100px;
  min-height: 300px;
}
.cart-items{
  position: absolute;
  top: 13px;
  right: 350px;
  font-size: 18px;
  width: 20px;
  text-align: center;
  display: inline-block;
  border-radius: 100px;
  background-color: mediumseagreen;
}
</style>
