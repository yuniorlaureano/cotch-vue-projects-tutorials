import Vue from 'vue';
import AppLayout from './theme/Layout.vue';

const app = new Vue({
    data: {
        hello: "Hellow12"
    },
    render: h => h(AppLayout)
    //template: '<App/>'
});

export { app };