<template>
  <div id="dragging-area" class="sticky-memo-area">
    <v-btn @click="handleClickAddButton">add</v-btn>
    <v-btn @click="handleClickChangeVisible">表示非表示切り替え</v-btn>
    {{ memos }}
    <StickyMemoVue
      v-for="(memo, i) in memos"
      :key="i"
      :memo="memo"
      :is-visible="memo.isVisible"
      target-id="dragging-area"
      @dragend="handleDragEnd($event, memo)"
      @change-text="handleChangeText($event, memo)"
    >
      <template #header>
        <v-btn icon color="black" @click="handleClickAddButton" @mousedown.stop >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        {{ memo.info.title }}
        <v-spacer />
        <v-btn icon @click="handleClickClose(memo)" @mousedown.stop>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
      <template #default>
        <v-textarea v-model="memo.info.content" dense class="px-2"></v-textarea>
      </template>
    </StickyMemoVue>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {StickyMemo} from "@/types/stickyMemo"
import StickyMemoVue from "@/components/stickyMemo.vue"
@Component({
  components: {
    StickyMemoVue
  }
})
export default class extends Vue {
  isVisible: boolean = true
  memosData: StickyMemo[] = JSON.parse(localStorage.getItem("memo") ?? "[]")

  get memos() {
    return this.memosData
  }

  set memos(memos: StickyMemo[]) {
    localStorage.setItem("memo", JSON.stringify(memos))
    this.memosData = memos
  }

  get largestIndex() {
    return Math.max(...[0,...this.memosData.map(x => x.index)])
  }

  handleDragEnd(e: {x: number, y: number}, memo: StickyMemo) {
    this.memos = this.memos.map(m => {
      if (m.index === memo.index) {
        return {
          ...m,
          x: e.x,
          y: e.y
        }
      }
      return m
    })
  }

  handleChangeText(text: string, memo: StickyMemo) {
    this.memos = this.memos.map(m => {
      if (m.index === memo.index) {
        return {
          ...m,
          info: {
            title: m.info.title,
            content: text
          }
        }
      }
      return m
    })
  }

  handleClickAddButton() {
    this.memos.push({
      x: 100,
      y: 100,
      width: 200,
      height: 200,
      index: this.largestIndex + 1,
      info: {
        title: "",
        content: ""
      }
    })
  }

  handleClickClose(memo: StickyMemo) {
    this.memos = this.memos.filter(x => x.index !== memo.index)
  }

  handleClickChangeVisible() {
    this.memos = this.memos.map(x => ({
      ...x,
      isVisible: !x.isVisible
    }))
  }
}
</script>

<style scoped>
.sticky-memo-area {
  position: relative;
  width: 800px;
  height: 800px;
  background: grey;
}
</style>
