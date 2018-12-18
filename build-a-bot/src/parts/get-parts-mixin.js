export default {
  created: function(){
    this.$store.dispatch("getParts");
  },
  computed:{
    parts: function(){
      return this.$store.state.robots.parts || {
        heads:[],
        arms:[],
        torsos:[],
        bases:[]
      }
    }
  }
}