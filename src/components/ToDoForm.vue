<template>
  <form class="todo-form" @submit.prevent="addToDo">
    <span class="todo-form__circle-empty"></span>
    <input type="text"
           placeholder="Create a new todo..."
           autofocus
           v-model.trim="text"
    >
  </form>
</template>

<script>

import { inject, ref } from "vue";

export default {

  name: "ToDoForm",
  setup() {

    const todos = inject('todos');
    const text = ref('');

    // Submit Form
    const addToDo = ()=> {

      if (text.value === "") {
        console.log("El campo no puede estar vacío")
        return
      }

      // Object class declaration
      const todo = {
        text: text.value,
        state: false,
        id: Date.now()
      }

      todos.value.push(todo)
      text.value = ''

    }

    return {
      addToDo,
      text
    }
  }
}
</script>

<style scoped>

</style>