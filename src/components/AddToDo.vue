<template>
   <div :style="{'filter': `blur(${blur})`}" class="add-to-do">
     <h1>Vue Todo</h1>
     <form class="search">
        <input v-model="valueTodo" type="text" autofocus placeholder="Add new!"><button @click="AddTodo">+</button>
     </form>
     <img v-if="todos.length===0" src="../image/arrow.png" alt="image"/>
   </div>
</template>
<script>
import { setInterval } from 'timers';
export default {
  name: 'AddToDo',
  data:function(){
    return{
      valueTodo:'',
      idTodo:0,
      second:'',
      minute:'',
      hour:'',
      done:false,
    }
  },
  computed:{
    todos(){return this.$store.state.todos},
    getTodo(){return this.$store.state.getTodo},
    blur(){return this.$store.state.blur},
  },
  methods:{
    AddTodo:function(event){
      if(this.valueTodo===''){return null}
      else{
        event.preventDefault();
        let data=new Date()
        this.hour=data.getHours();
        this.minute=data.getMinutes();
        this.second=data.getSeconds();
        if(this.hour < 10){this.hour = '0'+this.hour;}
        if(this.minute < 10){this.minute = '0'+this.minute;}
        if(this.second < 10){this.second = '0'+this.second;}
        const hours = `${this.hour}:${this.minute}:${this.second}`

        // get Data.................................

        let newTodo = {
            text:this.valueTodo,
            hours:hours,
            done:this.done,
          }
        this.$store.state.todos.push(newTodo)
        this.valueTodo='';

        //added todos..............................
      }
    }
  },
}
</script>
<style scoped lang="scss">
.add-to-do{
  transition: all .2s ease;
  height: 120px;
  h1{color:white;}
img{
  width: 30px;
  margin-top:40px;
  animation-name: arrow;
  animation-duration: .6s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  filter: grayscale(10);
}
@keyframes arrow {
  0%{transform: translateY(0)};
  25%{transform: translateY(5px)};
  50%{transform: translateY(10px)};
  75%{transform: translateY(5px)};
  100%{transform: translateY(0px)};
}
.search{
  padding-top:20px;
  input{
    border:1px solid rgba(255, 255, 255, 0.548);
    width: 90%;
    font-size: 23px;
    padding: 2px 5px;
    color:white;
    background: #333;
    outline: 0;
    };
   input:hover{
      outline: 1px;
      
    }
    button{
    border:0;
    position: absolute;
    margin-left:-25px;
    font-size:30px;
    line-height: 35px;
    color:rgb(255, 255, 255);
    background: 0;
    outline: 0;
  }
  button:hover{
    cursor: pointer;
  }
  }
}
@media only screen and (min-width:768px){
.add-to-do{
  .search{input{width: 50%;}}
}
}
</style>
