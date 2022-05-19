<template>
  <div class="task-container d-flex">
    <div class="flex-grow-1 d-flex justify-center">
      <div class="waiting-container justify-center d-flex">
        <task-container :tasks-prop="waitingTasks" />
      </div>
    </div>
    <v-divider vertical />
      <div class="flex-grow-1 d-flex justify-center">
        <div class="progress-container justify-center d-flex">
          <task-container :tasks-prop="progressTasks" />
        </div>
      </div>
    <v-divider vertical />
    <div class="flex-grow-1 d-flex justify-center">
      <div class="complete-container justify-center d-flex">
        <task-container :tasks-prop="completedTasks" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { taskStore } from "~/store"
import { Task } from "~/types/task"

@Component({ name: "taskPage" })
export default class extends Vue {
  get tasks(): Task[] {
    return taskStore.tasks
  }

  get waitingTasks(): Task[] {
    return this.tasks.filter((x) => x.status === "waiting")
  }

  get progressTasks(): Task[] {
    return this.tasks.filter((x) => x.status === "progress")
  }

  get completedTasks(): Task[] {
    return this.tasks.filter((x) => x.status === "completed")
  }
}
</script>

<style lang="stylus" scoped>
.waiting-container
  height 100%
  width 500px
.progress-container
  height 100%
  width 500px
.complete-container
  height 100%
  width 500px
</style>
