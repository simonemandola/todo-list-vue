<template>
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
</template>

<script>

import {computed, inject, provide, ref} from "vue";
import ToDoItem from "@/components/ToDoItem";
import ToDoFooter from "@/components/ToDoFooter";

export default {

  name: "ToDoList",

  components: {
    ToDoItem,
    ToDoFooter
  },

  setup() {

    const todosAll = inject('todos');
    const filter = ref('all');

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
      todos
    }

  }

}

</script>