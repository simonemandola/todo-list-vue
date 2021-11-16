<template>
  <div class="todo-footer">
    <span class="text-xxs">{{ itemsLeft }}<span> items left</span></span>
    <div class="todo-footer__btns-filter">
      <button type="button"
              :class="btnAll"
              @click.prevent="filterBy('all')">All
      </button>
      <button type="button"
              :class="btnActive"
              @click.prevent="filterBy('active')">Active
      </button>
      <button type="button"
              :class="btnCompleted"
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


    let all = true;
    let active = false;
    let completed = false;

    const filterBy = filterBy =>{

      filter.value = filterBy;

    }

    const btnAll = computed(()=>{

      if (filter.value === 'all') {
        all = true;
        active = false;
        completed = false;
        return { active: all }
      }

      return console.log();
    })

    const btnActive = computed(()=> {

      if (filter.value === 'active') {
        all = false;
        active = true;
        completed = false;
        return {active: active}
      }

      return console.log();

    });

    const btnCompleted = computed(()=> {

      if (filter.value === 'completed') {
        all = false;
        active = false;
        completed = true;
        return {active: completed}
      }

      return console.log()

    })

    const itemsLeft = computed(()=>{
      return todos.value.filter(item => item.state !== true).length
    });

    const clear = ()=> {
      todos.value = todos.value.filter(task => task.state === false);
    }

    return {
      itemsLeft,
      filterBy,
      clear,
      todos,
      btnAll,
      btnActive,
      btnCompleted
    }
  }

}
</script>