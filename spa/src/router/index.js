import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import About from '@/components/About'
import Param from '@/components/Param'
import Paramdetails from '@/components/Paramedetails'
import App from '../App'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: HelloWorld
    },
    {
    	path: '/about',
    	name: 'About',
    	component: About
    },
    {
    	path: '/param',
    	name: 'Param',
    	component: Param
    },
    {
    	path: '/paramdetails/:id',
    	name: 'Paramdetails',
    	component: Paramdetails
    }
  ],
  model: 'history'
})
