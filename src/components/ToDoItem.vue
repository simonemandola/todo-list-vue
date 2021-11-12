<template>

  <li style="display: flex; justify-content: space-between">
    <span role="button" :class="{ 'done' : todo.state }" @click="taskDone(todo)">{{ todo.text }}</span>
    <span role="button" @click="deleteItem(todo.id)">X</span>
  </li>
</template>

<script>

import { inject } from "vue";

export default {

  name: "ToDoItem",

  props: {
    todo: {
      type: Object,
      required: true
    }
  },

  setup() {

    const todos = inject('todos');

    const deleteItem = id => {
      todos.value = todos.value.filter(item => item.id !== id)
    }

    // Click on To Do
    const taskDone = task => {
        if(!task.state) {
          task.state = !task.state; // Change status and add class 'done'
        } else {
          task.state = !task.state; // Change status and remove class 'done'
        }
    }

    return {
      deleteItem,
      taskDone
    }
  }

}
</script>

<style>
.done {
  text-decoration: line-through;
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(.2rem);
}

.fade-up-leave-from,
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-up-enter-active,
.fade-up-leave-active {
  transition: all .4s ease;
}

.fade-up-leave-active {
  position: absolute;
}

li {
  transition: all .4s ease;
}

</style>