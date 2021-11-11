<template>
  <ol>
    <ToDoItem
        v-for="todo in todos" :key="todo.id"
        :todo="todo"
    ></ToDoItem>
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

<style scoped>

</style>