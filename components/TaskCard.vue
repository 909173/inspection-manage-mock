<template>
  <v-card>
    <v-card-title>
      {{task.title}}
    </v-card-title>
    <v-card-text>
      {{task.comment}}
    </v-card-text>
    <v-chip-group>
        <v-chip
            v-for="source in statusSources" :key="source" @click="handleClickChip(source)"
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
import { Status, Task } from "~/types/task"
import { taskStore } from "@/store"

@Component({ name: "taskCard"})
export default class extends Vue {
  @Prop({ default: true }) task!: Task
  statusSources: Status[] = ["waiting", "progress", "completed"]

  handleClickChip(data: Status) {
    taskStore.changeStatus({id: this.task.id, status: data})
  }
}
</script>

