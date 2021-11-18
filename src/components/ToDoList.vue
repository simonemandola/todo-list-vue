<template>
  <div class="todo-wrap__wrap-list">
  <transition-group tag="ol" name="fade-up" class="todo-list">
    <ToDoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
    ></ToDoItem>
  </transition-group>
  <transition name="fade-up">
    <ToDoFooter />
  </transition>
    </div>
  <transition name="fade-up">
    <ToDoFilterMobile />
  </transition>
</template>

<script>

import {computed, inject, provide, ref} from "vue";
import ToDoItem from "@/components/ToDoItem";
import ToDoFooter from "@/components/ToDoFooter";
import ToDoFilterMobile from "@/components/ToDoFilterMobile";

export default {

  name: "ToDoList",

  components: {
    ToDoItem,
    ToDoFooter,
    ToDoFilterMobile
  },

  setup() {

    const todosAll = inject('todos');
    const filter = ref('all');

    // const breakpoint = 601
    // let mobile = ref(false)
    //
    // if (window.innerWidth < breakpoint) {
    //   mobile.value = !mobile.value
    //   return mobile.value
    // }

    const todos = computed(()=>{

      // Button Show All
      if(filter.value === 'all' ) {
        return todosAll.value;
      }

      // Button Show Active to-do
      if(filter.value === 'active'){
        return todosAll.value.filter(task => task.state === false);
      }

      // Button Show Complete to-do
      if(filter.value === 'completed') {
        return todosAll.value.filter(task => task.state === true);
      }

      return console.log(todosAll.value);

    });

    provide('filter', filter);

    return {
      todos,
      // mobile
    }

  }

}

</script>