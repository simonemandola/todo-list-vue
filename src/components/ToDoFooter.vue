<template>
  <div>
    <span>Quedan <span>{{ itemsLeft }}</span></span>
    <button type="button" @click.prevent="showAll">Todas</button>
    <button type="button" @click.prevent="showActive">Activas</button>
    <button type="button" @click.prevent="showComplete">Completadas</button>
    <button type="button" @click.prevent="clean">Limpiar</button>
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

    toDoDuplicated.value = todos.value;
    let toDoComplete = [];
    // let cleaned = false;

    const showAll = ()=> {
      
      // if(cleaned) { // Update main array if was cleaned
      //   if (toDoActive.value.length > 0) toDoDuplicated = toDoActive.value;
      //   cleaned = false;
      // }

      todos.value = toDoDuplicated.value;

    };

    const showActive = ()=> {

      let active = false

      todos.value = toDoDuplicated.value;

      // if ( toDoActive.value.length > 0 ) todos.value = toDoActive.value;

      // Check if exist
      toDoDuplicated.value.forEach(task => {
        if(task.state) active = true
      })

      if (active) {
        toDoActive.value = todos.value.filter(task => !task.state)
        todos.value = toDoActive.value;
      }

    };

    const showComplete = ()=> {

      let completed = false

      todos.value = toDoDuplicated.value;

      // Check if exist
      todos.value.forEach(task => {
        if(task.state) completed = true
      });

      if(completed) {
        toDoComplete = todos.value.filter(task => task.state);
        // toDoActive.value = todos.value.filter(task => !task.state)
        todos.value = toDoComplete;
      }

    };

    const clean = ()=> {

      todos.value = toDoDuplicated.value;

      todos.value = todos.value.filter( task => !task.state );

      toDoDuplicated.value = todos.value;

    };


    return {
      showAll,
      showActive,
      showComplete,
      clean,
      itemsLeft
    }
  }
}
</script>

<style scoped>

</style>