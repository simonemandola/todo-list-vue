<template>
  <div>
    <header class="header">
      <h1>To do</h1>
      <span>º</span>
    </header>
    <ToDoForm />
    <ToDoList />
    <ToDoFooter />
    <footer>
      <p>Desarrollado por Simone Mandola</p>
    </footer>
  </div>
</template>

<script>

import ToDoForm from "@/components/ToDoForm";
import ToDoList from "@/components/ToDoList";
import ToDoFooter from "@/components/ToDoFooter";
import { ref, provide, watchEffect } from "vue";

export default {
  name: "ToDoApp",
  components: {
    ToDoForm,
    ToDoList,
    ToDoFooter
  },
  setup() {

    const todos = ref([]);
    provide('todos', todos);

    const toDoDuplicated = ref([]);
    provide('toDoDuplicated', toDoDuplicated);

    const itemsLeft = ref(0);
    provide('itemsLeft', itemsLeft);

    const toDoActive = ref([]);
    provide('toDoActive', toDoActive);

    watchEffect(()=>{})

  }
}
</script>

<style scoped>

</style>