<template>
  <div class="main-header d-flex align-center">
    <div class="header-label pl-2">タスク管理アプリ</div>
    <v-btn class="pl-3" @click="handleClickTaskPage">
      タスク管理
    </v-btn>
    <v-btn @click="handleClickAddTask">
      タスク追加
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { taskAddDialogStore } from "~/store"

@Component({name: "mainHeader"})
export default class extends Vue {
  handleClickTaskPage() {
    this.$router.push("/taskpage")
  }

  handleClickAddTask() {
    taskAddDialogStore.openDialog()
  }
}
</script>

<style lang="stylus" scoped>
.main-header
  height 100px !important
  background-color #ccc

.header-label
  font-size 30px
</style>
