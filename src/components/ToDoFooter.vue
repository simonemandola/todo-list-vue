<template>
  <div class="todo-footer">
    <span class="text-xxs">{{ itemsLeft }}<span> items left</span></span>
    <div class="todo-footer__btns-filter">
      <button type="button"
              :class="{ 'active' : btnActive.all }"
              @click.prevent="filterBy('all')">All
      </button>
      <button type="button"
              :class="{ 'active' : btnActive.active }"
              @click.prevent="filterBy('active')">Active
      </button>
      <button type="button"
              :class="{ 'active' : btnActive.completed }"
              @click.prevent="filterBy('completed')">Completed
      </button>
    </div>
    <button type="button"
            @click.prevent="clear">Clear Completed
    </button>
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
      filter.value = filterBy
    }

    const itemsLeft = computed(()=>{
      return todos.value.filter(item => item.state !== true).length
    });

    const clear = ()=> {
      todos.value = todos.value.filter(task => task.state === false);
    }

    const btnActive = {
      all: true,
      active: false,
      completed: false
    };

    return {
      itemsLeft,
      filterBy,
      clear,
      todos,
      btnActive,
    }
  }

}
</script>