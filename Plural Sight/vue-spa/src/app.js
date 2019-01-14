import Vue from 'vue';
import AppLayout from './theme/Layout.vue';
import router from './router';

const app = new Vue({
    render: h => h(AppLayout),
    router: router
    //template: '<AppLayout/>'
});

export { app, router };