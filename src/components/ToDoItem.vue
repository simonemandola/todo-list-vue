<template>
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
    const toDoActive = inject('toDoActive');
    const toDoDuplicated = inject('toDoDuplicated');
    const itemsLeft = inject('itemsLeft');

    const deleteItem = id => {

      todos.value.forEach(todo =>{
        if(todo.id === id) {
          if(!todo.state) {
            itemsLeft.value = itemsLeft.value - 1;
          }
        }
      });

      todos.value = toDoDuplicated.value;
      todos.value = todos.value.filter(item => item.id !== id);

      toDoDuplicated.value = todos.value;

      toDoActive.value = todos.value;

    }

    // Click on To Do
    const taskDone = task => {
        if(!task.state) {
          task.state = !task.state; // Change status and add class 'done'
          itemsLeft.value = itemsLeft.value - 1;
        } else {
          task.state = !task.state; // Change status and remove class 'done'
          itemsLeft.value = itemsLeft.value + 1;
        }
    }

    return {
      deleteItem,
      taskDone
    }
  }

}
</script>