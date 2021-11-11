<template>
  <div>
    <header class="header">
      <h1>To do</h1>
      <span>º</span>
    </header>
    <ToDoForm />
    <ToDoList />
    <footer>
      <p>Desarrollado por Simone Mandola</p>
    </footer>
  </div>
</template>

<script>

import ToDoForm from "@/components/ToDoForm";
import ToDoList from "@/components/ToDoList";
import { ref, provide, watchEffect } from "vue";

export default {
  name: "ToDoApp",
  components: {
    ToDoForm,
    ToDoList
  },
  setup() {

    const todos = ref([])
    provide('todos', todos)

    watchEffect(()=>{})

  }
}
</script>

<style scoped>

</style>