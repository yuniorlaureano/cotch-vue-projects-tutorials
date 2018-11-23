<template>
    <button @click="GoToRoute">Go</button>
</template>
<script>
    export default {
    name: 'Param',
    data () {
        return {
        UserInput :'5'
        }

    }, 
    methods:{
        GoToRoute : function(){
        this.$router.push({ name: 'Paramdetails', params: { id: this.UserInput }})
        }
    }
}
</script>