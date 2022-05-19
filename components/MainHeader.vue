<template>
  <div class="main-header d-flex align-center">
    <div class="header-label pl-2">タスク管理アプリ</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

@Component({name: "mainHeader"})
export default class extends Vue {

}
</script>

<style lang="stylus" scoped>
.main-header
  height 100px !important
  background-color #ccc

.header-label
  font-size 30px
</style>
