<template>
    <main>
      <section class="todo-wrap" :style="bgDark">
        <div class="todo-wrap__inner">
          <header class="header">
            <h1 class="title-h1">Todo</h1>
            <i role="button" class="icon__sun"></i>
          </header>
          <ToDoForm />
          <div class="todo-wrap__wrap-list">
            <ToDoList/>
            <ToDoFooter></ToDoFooter>
          </div>
          <p class="text-xxs drag-text" >Drag and drop to
            reorder
            list</p>
        </div>
      </section>
    </main>
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

    const bgDark = "background-image: url(\"../img/bg-desktop-dark.jpg\")";
    const bgLight = "background-image: url(\"../img/bg-desktop-light.jpg\")";

    watchEffect(()=>{});

    return {
      todos,
      bgDark,
      bgLight
    }

  }
}
</script>

<style scoped>

</style>