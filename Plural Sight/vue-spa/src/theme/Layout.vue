<template>
    <div id="app">   
        <app-header/>     
        <section class="main-section section">
            <div class="container content">
                <router-view></router-view>
            </div>
        </section>    
        <app-footer/>    
    </div>
</template>
<script>
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';

export default {
    components:{
        'app-header': AppHeader,
        'app-footer': AppFooter
    }    
}
</script>
<style>
</style>

