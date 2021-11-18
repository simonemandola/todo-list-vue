<template>
  <div class="todo-filter-mobile">
    <div class="todo-filter-mobile__btns-filter">
      <button type="button"
              title="Show All"
              :class="btnAll"
              @click.prevent="filterBy('all')">All
      </button>
      <button type="button"
              title="Show Active"
              :class="btnActive"
              @click.prevent="filterBy('active')">Active
      </button>
      <button type="button"
              title="Show Completed"
              :class="btnCompleted"
              @click.prevent="filterBy('completed')">Completed
      </button>
    </div>
  </div>
</template>

<script>
import {inject, computed} from "vue";

export default {
  name: "ToDoFooter",

  setup() {

    const todos = inject('todos');
    const filter = inject('filter');

    const filterBy = filterBy =>{
      filter.value = filterBy;
    }

    // Button All
    const btnAll = computed(()=>{
      if (filter.value === 'all') return { active: true }
      return console.log();
    })

    //  Button Active
    const btnActive = computed(()=> {
      if (filter.value === 'active') return {active: true}
      return console.log();
    });


    // Button Completed
    const btnCompleted = computed(()=> {
      if (filter.value === 'completed') return {active: true}
      return console.log()
    });

    const itemsLeft = computed(()=>{
      return todos.value.filter(item => item.state !== true).length
    });

    return {
      itemsLeft,
      filterBy,
      todos,
      btnAll,
      btnActive,
      btnCompleted
    }
  }

}
</script>