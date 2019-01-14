import Vue from 'vue';
import VueRouter from 'vue-router';
import Category from './theme/Category.vue';
import Login from './theme/Login.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'is-active',
    scrollBehavior: (to, from, savePosition) => ({y:0}),
    routes:[{
        path: '/login', component: Login
    },
    {
        path: '/', component: Category
    }]
});

export default router;