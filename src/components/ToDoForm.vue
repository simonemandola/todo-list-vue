<template>
  <form @submit.prevent="addToDo">
    <input type="text"
    placeholder="Añade tarea a la lista"
    v-model.trim="text"
    >
  </form>
</template>

<script>

import {inject, ref} from "vue";

export default {

  name: "ToDoForm",
  setup() {

    const todos = inject('todos')
    const text = ref('')

    // Submit Form
    const addToDo = ()=> {

      if (text.value === "") {
        console.log("El campo no puede estar vacío")
        return
      }

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