<template>
  <v-card class="task-card">
    <v-card-title>
      {{taskProp.title}}
    </v-card-title>
    <v-card-text>
      {{taskProp.comment}}
    </v-card-text>
    <v-chip-group v-model="cardStatus" active-class="primary" @change="handleChangeChip">
        <v-chip
            v-for="source in statusSources" :key="source" :value="source"
          >
            {{ source }}
          </v-chip>
      </v-chip-group>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"
import { taskStore } from "~/store"
import { Status, Task } from "~/types/task"

@Component({ name: "taskCard"})
export default class extends Vue {
  @Prop({ default: true }) taskProp!: Task
  statusSources: Status[] = ["waiting", "progress", "completed"]

  cardStatus: Status = this.taskProp.status

  handleChangeChip() {
    taskStore.changeStatus({id: this.taskProp.id, status: this.cardStatus})
  }
}
</script>

<style lang="stylus" scoped>
.chip-active-class
  color blue
</style>
