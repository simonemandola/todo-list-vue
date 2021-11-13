<template>
    <main>
      <section class="todo-wrap">
        <div class="todo-wrap__inner">
          <header class="header">
            <h1 class="title-h1">Todo</h1>
            <i role="button" class="icon__sun"></i>
          </header>
          <ToDoForm/>
          <ToDoList/>
          <p class="text-xxs drag-text">Drag and drop to reorder list</p></div>
      </section>
    </main>
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