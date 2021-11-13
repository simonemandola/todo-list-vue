<template>
  <transition-group tag="ol" name="fade-up" class="todo-list">
      <ToDoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
      ></ToDoItem>
<!--    <li v-if="todos.length <= 0">No tienes tareas :)</li>-->
  </transition-group>
</template>

<script>

import { inject } from "vue";
import ToDoItem from "@/components/ToDoItem";

export default {

  name: "ToDoList",

  components: {
    ToDoItem,
  },

  setup() {

    const todos = inject('todos')

    return {
      todos
    }

  }

}

</script>