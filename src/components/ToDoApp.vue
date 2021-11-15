<template>
    <main>
      <section class="todo-wrap" :style="bg">
        <div class="todo-wrap__inner">
          <header class="header">
            <h1 class="title-h1">Todo</h1>
            <i role="button" class="icon__sun"
               @click="changeMode"></i>
          </header>
          <ToDoForm />
          <div class="todo-wrap__wrap-list">
            <ToDoList />
          </div>
          <transition name="fade-up">
            <p  class="text-xxs drag-text">Drag and drop to reorder list</p>
          </transition>
        </div>
      </section>
    </main>
</template>

<script>

import ToDoForm from "@/components/ToDoForm";
import ToDoList from "@/components/ToDoList";
import {ref, provide, watchEffect} from "vue";

export default {
  name: "ToDoApp",
  components: {
    ToDoForm,
    ToDoList,
  },

  setup() {

    const todos = ref([]);
    provide('todos', todos);

    const mode = {
      light: {
        active: false,
        bg: `background-image: url('../img/bg-desktop-light.jpg')`
      },
      dark: {
        active: true,
        bg: `background-image: url('../img/bg-desktop-dark.jpg')`
      }
    }

    let bg = mode.dark.bg;

    const changeMode = ()=> {
      if(mode.dark.active) {
        mode.dark.active = false;
      } else {
        mode.dark.active = true;
      }
    }

    watchEffect(()=>{});

    return {
      todos,
      bg,
      mode,
      changeMode
    }

  }
}
</script>