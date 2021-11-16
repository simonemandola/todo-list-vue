<template #item="todo">
  <li class="todo-list__item">
    <i role="button" class="icon__check todo-list__btn-check" :class="{ 'check-done' : todo.state }" @click="taskDone(todo)"></i>
    <span role="button" :class="{ 'done' : todo.state }" @click="taskDone(todo)">{{ todo.text }}</span>
    <i class="icon__cross" role="button" @click="deleteItem(todo.id)"></i>
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

      todos.value = todos.value.filter(item => item.id !== id);

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