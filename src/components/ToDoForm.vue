<template>
  <form @submit.prevent="addToDo">
    <input type="text"
    placeholder="Añade tarea a la lista"
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
    const itemsLeft = inject('itemsLeft');

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

      itemsLeft.value = itemsLeft.value + 1

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