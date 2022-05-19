<template>
  <div>
    <div v-for="task in tasksProp" :key="task.id">
      <task-card :task-prop="task" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { Component, Prop } from "vue-property-decorator"
import { Task } from "~/types/task"

@Component({ name: "taskContainer" })
export default class extends Vue {
@Prop({default: true}) tasksProp!: Task[]

}
</script>

