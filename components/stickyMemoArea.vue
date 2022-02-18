<template>
  <div class="sticky-memo-area">
    <StickyMemoVue
      v-for="memo in memos"
      :key="memo.zIndex"
      :memo="memo"
      @dragend="handleDragEnd($event, memo)"
      @change-text="handleChangeText($event, memo)"
    ></StickyMemoVue>
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
  memos: StickyMemo[] = [{
    x: 100,
    y: 100,
    zIndex: 1,
    info: {
      title: "title",
      content: "some content"
    }}, {
    x: 100,
    y: 100,
    zIndex: 3,
    info: {
      title: "title",
      content: "some content"
    }
  }]

  handleDragEnd(e: {x: number, y: number}, memo: StickyMemo) {
    this.memos = this.memos.map(m => {
      if (m.zIndex === memo.zIndex) {
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
      if (m.zIndex === memo.zIndex) {
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
}
</script>

<style scoped>
.sticky-memo-area {
  /* position: relative; */
  width: 800px;
  height: 800px;
  background: grey;
}
</style>
