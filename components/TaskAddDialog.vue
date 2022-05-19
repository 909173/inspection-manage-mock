<template>
  <v-dialog v-model="isVisibleDialog" class="task-add-dialog">
    <v-card class="card">
      <div>
        タスク追加
      </div>
      <v-text-field v-model="title" class="pa-1" />
      <v-textarea v-model="comment" rows="4" class="pa-1" />
      <div class="d-flex">
        <v-btn @click="handleClickAddButton">
          追加
        </v-btn>
        <v-btn @click="handleClickCancelButton">
          キャンセル
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { taskAddDialogStore, taskStore } from "../store"

@Component({ name: "taskAddDialog"})
export default class extends Vue {
  title: string = ""
  comment: string = ""

  get isVisibleDialog() {
    return taskAddDialogStore.isVisibleDialog
  }

  set isVisibleDialog(data: boolean) {
    taskAddDialogStore.SET_IS_VISIBLE_DIALOG(data)
  }

  handleClickAddButton() {
    taskStore.setTask({title: this.title, comment: this.comment})
    taskAddDialogStore.SET_IS_VISIBLE_DIALOG(false)

  }

  handleClickCancelButton() {
    taskAddDialogStore.SET_IS_VISIBLE_DIALOG(false)
  }
}
</script>

<style lang="stylus" scoped>
.card
  height 100%
</style>
