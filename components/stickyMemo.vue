<template>
  <div
    ref="stickyMemo"
    class="sticky-memo pa-0"
    :style="{
      left: `${memo.x}px`,
      top: `${memo.y}px`,
      width: `${memo.width}px`,
      height: `${memo.height}px`
    }"

  >
    <div
      class="sticky-memo-header px-2"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    >
      <slot name="header"></slot>

    </div>
    <div class="sticky-memo-content d-flex align-stretch">
      <div class="left"/>
      <!-- <v-textarea v-model="text" dense class="px-2"></v-textarea> -->
      <slot></slot>
      <div class="right"/>
    </div>
    <div class="bottom" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit, Prop } from 'vue-property-decorator'
import { Sticky } from '~/types/stickyMemo'
@Component
export default class extends Vue {
  isVisible: boolean = true
  '$refs': {
    stickyMemo: HTMLElement
  }

  shiftX = 0
  shiftY = 0
  @Prop({ required: true }) memo!: Sticky<any>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Emit("dragend") dragEndEmit(eve: {x: number, y: number}) {}
  handleDrag(e: DragEvent) {
    this.moveAt(e.pageX, e.pageY)
  }

  handleDragStart(e: DragEvent) {
    e.dataTransfer?.setDragImage(new Image(), 0,0)
  }

  moveAt(pageX: number, pageY: number) {
    const newX = pageX - this.shiftX
    const newY = pageY - this.shiftY - 60 // ヘッダー分を考慮
    const fixX = newX < 0 ? 0 : newX > 1920 ? 1920 : newX
    const fixY = newY < 0 ? 0 : newY > 1280 ? 1280 : newY
    this.dragEndEmit({
      x: fixX,
      y: fixY
    })
  }

  onMouseMove(event: MouseEvent) {
    this.moveAt(event.pageX, event.pageY)
  }

  isMouseXInBox() {
    return  this.shiftX > 2
      && this.shiftX < this.memo.width -2
  }

  isMouseYInBox() {
    return this.shiftY > 2
    && this.shiftY < this.memo.height - 2
  }

  handleMouseDown(e: MouseEvent) {
    this.shiftX = e.clientX - this.$refs.stickyMemo.getBoundingClientRect().left
    this.shiftY = e.clientY - this.$refs.stickyMemo.getBoundingClientRect().top
    if (this.isMouseXInBox() && this.isMouseYInBox()) {
      const nuxt = document.getElementById("vuetify-app")
      nuxt?.append(this.$refs.stickyMemo)
      this.moveAt(e.pageX, e.pageY)
      document.addEventListener('mousemove', this.onMouseMove)
      // 画面外で左クリックを離されたときにマウスアップイベントを発火させるために追加
      window.addEventListener('mouseup', this.handleMouseUp)
    }
  }

  handleMouseUp() {
    document.removeEventListener('mousemove', this.onMouseMove)
    this.$refs.stickyMemo.onmouseup = null
    // 画面外でのマウスアップイベントを削除
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  mounted() {
    this.$refs.stickyMemo.ondragstart = () => false
  }
}
</script>

<style scoped>
.sticky-memo-header {
  background-color: yellow;
  border-radius: 4px 4px 0px 0px;
  align-items: center;
  display: flex;
  width: 100%;
  color: black;
}
.sticky-memo {
  cursor: default;
  position: absolute;
  border-radius: 4px;
  z-index: 2;
  background-color: white;
  color:black;
  /* border: solid 2px black; */
  box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)!important;
}
.left, .right {
  width: 2px;
  background-color: transparent;
  cursor: ew-resize;
}
.bottom {
  height: 2px;
  background-color: transparent;
  cursor: ns-resize;
}
</style>
