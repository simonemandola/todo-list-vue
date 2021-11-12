<template>
  <ol>
      <ToDoItem
          v-for="todo in todos"
          :key="todo.id"
          :todo="todo"
      ></ToDoItem>
    <li v-if="todos.length <= 0">Todavía no tienes tareas :)</li>
  </ol>
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

<style>

</style>