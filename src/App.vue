<template>
  <div id="app">
    <music></music>
    <router-view/>
  </div>
</template>
<script>
  import music from './components/music'
  export default {
    components:{
      music
    },
    data(){
      return{
        
      }
    }
  }
</script>
<style>
  body,html{
    margin: 0;
    padding: 0;
  }
</style>
