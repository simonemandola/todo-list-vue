<template>
    <main>
      <section class="todo-wrap" :class="currentMode">
        <div class="todo-wrap__inner">
          <header class="header">
            <h1 class="title-h1">Todo</h1>
            <label :title="(currentMode === 'light') ? 'Toggle to dark mode!' : 'Toggle to light mode!'">
              <input
                  type="checkbox"
                  :checked="(mode.value === 'light') ? checked : false"
                  @click="changeMode"
              >
              <button type="button">
                <i :class="(currentMode === 'light') ? 'icon__moon' : 'icon__sun'"></i>
              </button>
            </label>
          </header>
          <ToDoForm />
          <ToDoList />
          <transition name="fade-up">
            <p class="text-xxs drag-text">Drag and drop to reorder list</p>
          </transition>
        </div>
      </section>
    </main>
</template>

<script>

import ToDoForm from "@/components/ToDoForm";
import ToDoList from "@/components/ToDoList";
import {ref, provide, computed} from "vue";

export default {
  name: "ToDoApp",
  components: {
    ToDoForm,
    ToDoList
  },

  setup() {

    const todos = ref([]);
    provide('todos', todos);

    const mode = ref('dark');

    const changeMode = ()=> {
      if(mode.value === 'dark') return mode.value = 'light';

      if(mode.value === 'light') return mode.value = 'dark';

    }

    const currentMode = computed(()=>{

      if(mode.value === 'light') return mode.value

      return mode.value
    });

    return {
      todos,
      mode,
      changeMode,
      currentMode
    }

  }
}
</script>