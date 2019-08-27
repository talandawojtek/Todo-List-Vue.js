<template>
  <div class="todos">
      <ul v-for="todo in todos" :key="todo.id">
          <li :style="{'filter': `blur(${blur})`}" :class="{active:todo.done}">
            <div class="result">
            <img class="done-icon" v-if="todo.done===false" src="../image/todone.png" alt="icon" @click="done(todo)"/>
            <img class="done-icon" v-if="todo.done===true" src="../image/done.png" alt="icon" @click="done(todo)"/>
            <p @click="edit(todo)" class="text">{{todo.text}}</p> 
            <button class="delete" @click="removeTodo(todo)"><img src="../image/delete.png" alt="icon"/></button>
            <p class="time">{{todo.hours}}</p>
            </div>
          </li>
      </ul>
      <button :style="{'filter': `blur(${blur})`}" v-if="todos.length>=1" @click="removeAll" class="deleteAll">clear all</button>
      <div v-if="editor===true" class="panelEdit">
        <form>
          <input type="text" v-model="valueEdit"><button class="correct" @click="correct">correct</button>
        </form>
        <button class="cancel" @click="cancel">X</button>
      </div>
  </div>
</template>

<script>
export default {
  name: "Todos",
  data:function(){
    return{
      editor:false,
      valueEdit:'',
      index:'',
    }
  },
  computed:{
    todos(){return this.$store.state.todos},
    blur(){return this.$store.state.blur},
  },
  methods:{
      removeTodo:function(todo){
        this.index=this.$store.state.todos.indexOf(todo)
        this.$store.state.todos.splice(this.index,1);
      },
      removeAll:function(){this.$store.state.todos.splice(0,this.$store.state.todos.length)},
      done:function(todo){
        if(todo.done===true){todo.done=false}
        else{todo.done=true}
      },
      edit:function(todo){
        this.index=this.$store.state.todos.indexOf(todo)
        this.valueEdit=todo.text
        this.editor=true
      },
      correct:function(){
        this.$store.state.todos[this.index].text=this.valueEdit
        this.editor=false
      },
      cancel:function(){this.editor=false}
  },
    mounted:function(){
      this.$store.state.todos=JSON.parse(localStorage.getItem('todos'))
    },
    updated:function(){
      localStorage.setItem('todos',JSON.stringify(this.$store.state.todos));
      if(this.editor===true){this.$store.state.blur='5px'}
      else{this.$store.state.blur=0}
      },
}
</script>
<style scoped lang="scss">
@mixin btn{
  padding: 2px 5px;
  background:0;
  outline: none;
  font-weight: bold;
  transition: all .2s cubic-bezier(0.42, 0, 0.78, 2.75);
}
.todos{
  overflow: hidden;
  ul{
    list-style-type: none;
    li{
      animation-name: newTodo;
      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-timing-function: linear;
      min-height: 70px;
      transition: all .2s ease;
      .edit:hover{
        background: black;
        color:white;
        transform: scale(1.1);
      }
      .result{
        border-bottom:1px solid rgba(252, 252, 252, 0.281);
        display: flex;
        width: 70%;
        margin:auto;
        padding: 15px 0;
        .text{
          margin-top:15px;
          margin-left:5px;
          color:rgb(255, 255, 255);
          text-align: left;
          font-size: 14px;
          transition: all .1s linear;
          position: relative;
        }
        .text:hover{cursor: pointer;color:rgba(255, 255, 255, 0.267);}
        .time{
          position: absolute;
          right: 0;
          margin-top:28px;
          margin-right:5px;
          display: none;
          color:rgba(255, 255, 255, 0.39);
        }
      }
      .done-icon{
        position: absolute;
        left:5px;
        margin-top:5px;
        z-index: 999;
        max-width: 40px;
        max-height: 40px;
        transition: all .2s cubic-bezier(0.42, 0, 0.78, 2.75);
        animation-name: done;
        animation-duration: .4s;
        animation-fill-mode: forwards;
        animation-timing-function: linear;
      }
      @keyframes done {
        0%{transform:scale(1);opacity: 0;};
        25%{transform: scale(1.15);opacity: .5;};
        50%{transform: tscale(1.4);opacity: 1;};
        75%{transform: scale(1.1);opacity: 1;};
        100%{transform: scale(1);opacity: 1;};
      }
      .done-icon:hover{
        transform: scale(1.1);
        cursor: pointer;
        
      }
      .delete{
        img{width: 15px;filter:saturate(3)}
        position: absolute;
        right:10px;
        margin-top:18px;
        border:0;
        transition: all .3s linear;
        @include btn;
      }
      .delete:hover{
        transform: scale(1.3);
      }
      button:hover{
        cursor: pointer;
      }
    }
  @keyframes newTodo {
  0%{opacity: 0; background: rgba(0, 153, 38, 0.24)}
  100%{opacity: 1;}
  }
  }
  .active{
    background: rgba(0, 153, 38, 0.24);
  }
  .deleteAll{
    background: 0;
    border:3px solid red;
    padding: 5px 10px;
    color:red;
    text-transform: uppercase;
    font-weight: bold;
    margin:20px;
    border-radius: 20px;
    transition: all .2s cubic-bezier(0.42, 0, 0.78, 2.75);
  }
  .deleteAll:hover{
    background: red;
    color:white;
    cursor: pointer;
    transform: scale(1.1);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.322);
  }
  .panelEdit{
    z-index: 999;
    width: 320px;
    position: absolute;
    transform: translate(-50%,-50%);
    left:50%;
    top:40%;
    background: rgb(255, 255, 255);
    border:3px solid black;
    padding: 10px;
    height: 120px;
    box-shadow: 0px 3px 10px;
    form{margin-top:30px;}
     input{
     float: left;
     padding: 2px 5px;
     margin-right: 6px;
     background: 0;
     border:0;
     border-bottom:1px solid black;
     outline: none;
    }
    .cancel{
      position: absolute;
      top:-10px;
      right: -10px;
      background: rgb(255, 255, 255);
      }
      .cancel:hover{
        background: black;
        color:white;
      }
      .correct{border-color:rgb(0, 175, 0);color:rgb(0, 175, 0);}
    button{
      border:3px solid rgb(0, 0, 0);
      color:rgb(2, 2, 2);
      @include btn;
    }
    button:hover{cursor:pointer;transform: scale(1.1);}
  }
}
@media only screen and (min-width:768px){
  .todos{
    ul{
    li{
      width: 50%;
      margin:auto;
      .result{
        width: 100%;
        padding-top:10px;
        .text{
          margin-left:10px;
        }
        .done-icon{
          position:relative;
        }
        .delete{
          right:20px;
          top:5px;
          opacity: 0;
        }
        .time{
          display:block;
          right: -70px;
          top:-5px;
        }
        }
      }
      li:hover{.delete{opacity: 1;}}
    }
  }
};
</style>
