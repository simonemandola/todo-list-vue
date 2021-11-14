<template>
  <div class="todo-footer">
    <span class="text-xxs">{{ itemsLeft }}<span> items left</span></span>
    <div class="todo-footer__btns-filter">
      <button type="button"
              :class="{ 'active' : btnActive.all }"
              @click.prevent="showAll">All
      </button>
      <button type="button"
              :class="{ 'active' : btnActive.active }"
              @click.prevent="showActive">Active
      </button>
      <button type="button"
              :class="{ 'active' : btnActive.completed }"
              @click.prevent="showComplete">Completed
      </button>
    </div>
    <button type="button"
            @click.prevent="clean">Clear Completed
    </button>
  </div>
</template>

<script>
import {inject} from "vue";

export default {
  name: "ToDoFooter",

  setup() {

    const todos = inject('todos');
    const toDoActive = inject('toDoActive');
    const toDoDuplicated = inject('toDoDuplicated');
    const itemsLeft = inject('itemsLeft');

    const btnActive = {
      all: true,
      active: false,
      completed: false
    };

    toDoDuplicated.value = todos.value;
    let toDoComplete = [];

    // Button Show All to-do
    const showAll = ()=> {

      btnActive.all = true;
      btnActive.active = false;
      btnActive.completed = false;

      todos.value = toDoDuplicated.value;

    };

    // Button Show Active to-do
    const showActive = ()=> {

      todos.value = toDoDuplicated.value;

      // Check if exist
      toDoDuplicated.value.forEach(task => {
        if(!task.state){

          toDoActive.value = todos.value.filter(task => !task.state)
          todos.value = toDoActive.value;
          btnActive.all = false;
          btnActive.active = true;
          btnActive.completed = false;
        }
      });

    };

    // Button Show Complete to-do
    const showComplete = ()=> {

      todos.value = toDoDuplicated.value;

      // Check if exist
      todos.value.forEach(task => {
        if(task.state) {

          btnActive.all = false;
          btnActive.active = false;
          btnActive.completed = true;

          toDoComplete = todos.value.filter(task => task.state);
          todos.value = toDoComplete;
        }
      });



    };

    // Button Clean Completed to-do
    const clean = ()=> {

      btnActive.all = true;
      btnActive.active = false;
      btnActive.completed = false;

      todos.value = toDoDuplicated.value;

      todos.value = todos.value.filter( task => !task.state );

      toDoDuplicated.value = todos.value;

    };

    return {
      showAll,
      showActive,
      showComplete,
      clean,
      itemsLeft,
      btnActive,
    }
  }

}
</script>

<style scoped>

</style>