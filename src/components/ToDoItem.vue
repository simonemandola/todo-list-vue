<template>
<!--  <transition name="fade-up">-->
    <li style="display: flex; justify-content: space-evenly">
      <span role="button" :class="{ 'done' : todo.state }" @click="taskDone(todo)">{{ todo.text }}</span>
      <span role="button" @click="deleteItem(todo.id)">X</span>
    </li>
<!--  </transition>-->
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

</style>