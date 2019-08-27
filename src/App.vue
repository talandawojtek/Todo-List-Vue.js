<template>
  <div id="app">
    <AddToDo />
    <Todos />
  </div>
</template>
<script>
import AddToDo from './components/AddToDo.vue'
import Todos from './components/Todos.vue'
export default {
  components:{
    AddToDo,
    Todos,
  },
}
</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato|Poppins:400,700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
body{
  height: 100vh;
  background: rgb(46, 46, 46);
}
#app{
  text-align: center;
}
</style>
