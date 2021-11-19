<template>
  <div class="todo-wrap__wrap-list">
  <transition-group
      tag="ol"
      name="fade-up"
      class="todo-list"
  >
    <ToDoItem
        @drop="onDrop($event, todo)"
        @dragover.prevent
        @dragenter.prevent
        @dragstart="onDragStart($event, todo.id)"
        draggable="true"
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
    ></ToDoItem>
  </transition-group>
  <transition name="fade-up">
    <ToDoFooter />
  </transition>
    </div>
  <transition name="fade-up">
    <ToDoFilterMobile />
  </transition>
</template>

<script>

import {computed, inject, provide, ref} from "vue";
import ToDoItem from "@/components/ToDoItem";
import ToDoFooter from "@/components/ToDoFooter";
import ToDoFilterMobile from "@/components/ToDoFilterMobile";

export default {

  name: "ToDoList",

  components: {
    ToDoItem,
    ToDoFooter,
    ToDoFilterMobile
  },

  setup() {

    const todosAll = inject('todos');
    const filter = ref('all');

    const todos = computed(()=>{

      // Button Show All
      if(filter.value === 'all' ) {
        return todosAll.value;
      }

      // Button Show Active to-do
      if(filter.value === 'active'){
        return todosAll.value.filter(task => task.state === false);
      }

      // Button Show Complete to-do
      if(filter.value === 'completed') {
        return todosAll.value.filter(task => task.state === true);
      }

      return console.log(todosAll.value);

    });

    provide('filter', filter);

    // On Drag Start Function
    function onDragStart(e, todoId) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      // Find Array ID of todoItem from start to toggle it
      const startFromId = todosAll.value.findIndex(todo => todo.id === todoId)
      e.dataTransfer.setData('itemId', startFromId)
    }

    // On Drop Function
    function onDrop(e, TodoToReplace) {

      let startFromId = e.dataTransfer.getData('itemId')

      const todoIdToReplace = TodoToReplace.id;

      // Find Array ID of todoItem to replace it
      let replaceToId = todosAll.value.findIndex(todo => todo.id === todoIdToReplace)

      todosAll.value.map(todo => {
        if (todo === todosAll.value[replaceToId]) {
          let copyStartId = todosAll.value[startFromId];
          let copyReplaceId = todosAll.value[replaceToId];
          todo = todosAll.value[startFromId]
          todosAll.value[replaceToId] = copyStartId
          todosAll.value[startFromId] = copyReplaceId
          return todo
        }
      })

    }

    return {
      todos,
      onDrop,
      onDragStart
    }

  }

}

</script>