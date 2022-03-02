<template>
  <div
    ref="stickyMemo"
    class="sticky-memo pa-0"
    :style="{
      left: `${memo.x}px`,
      top: `${memo.y}px`,
      width: `${memo.width}px`,
      height: `${memo.height}px`,
      display: isVisible === false ? 'none' : ''
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
      <div class="left" @mousedown="handleMouseDownLeftEdge" @mouseup="handleMouseUpLeftEdge"/>
      <slot></slot>
      <div class="right" @mousedown="handleMouseDownRightEdge" />
    </div>
    <div class="bottom" @mousedown="handleMouseDownBottom"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit, Prop } from 'vue-property-decorator'
import { Sticky } from '~/types/stickyMemo'
@Component({
  name: "sticky-memo",
  model: {
    prop: "isVisible",
    event: "change"
  }
})
export default class extends Vue {
  '$refs': {
    stickyMemo: HTMLElement
  }

  shiftX = 0
  shiftY = 0
  @Prop({ required: true }) memo!: Sticky<any>

  @Prop({ required: false }) isVisible!: boolean

  @Prop({ required: false, default: "vuetify-app"}) targetId!: string

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Emit() change(value:boolean) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Emit("drag-end") dragEndEmit(eve: {x: number, y: number}) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Emit("drag-end-edge") dragEndEdgeEmit(eve: {height: number, width: number, x: number, y: number}) {}

  moveAt(e: MouseEvent) {
    const target = document.getElementById(this.targetId)
    const leftPrefix = target?.getBoundingClientRect().left ?? 0;
    const topPrefix = target?.getBoundingClientRect().top ?? 0;
    const newX = e.clientX - this.shiftX - (leftPrefix)
    const newY = e.clientY - this.shiftY - (topPrefix)
    const rightEdge = (target?.offsetWidth ?? 0) - this.$refs.stickyMemo.offsetWidth
    const bottomEdge = (target?.offsetHeight ?? 0) - this.$refs.stickyMemo.offsetHeight

    const fixX = newX < 0
      ? 0
      : newX > rightEdge
      ? rightEdge
      : newX
    const fixY = newY < 0
      ? 0
      : newY > bottomEdge
      ? bottomEdge
      : newY
    this.dragEndEmit({
      x: fixX,
      y: fixY
    })
  }

  onMouseMove(event: MouseEvent) {
    this.moveAt(event)
  }


  handleMouseDown(e: MouseEvent) {
    const target = document.getElementById(this.targetId)
    this.shiftX = e.clientX - this.$refs.stickyMemo.getBoundingClientRect().left
    this.shiftY = e.clientY - this.$refs.stickyMemo.getBoundingClientRect().top
    target?.append(this.$refs.stickyMemo)

    this.moveAt(e)
    document.addEventListener('mousemove', this.onMouseMove)
    // 画面外で左クリックを離されたときにマウスアップイベントを発火させるために追加
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp() {
    document.removeEventListener('mousemove', this.onMouseMove)
    this.$refs.stickyMemo.onmouseup = null
    // 画面外でのマウスアップイベントを削除
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseDownLeftEdge(e: MouseEvent) {
    this.shiftX = e.clientX - this.$refs.stickyMemo.getBoundingClientRect().left

    const target = document.getElementById(this.targetId)
    target?.append(this.$refs.stickyMemo)
    document.addEventListener('mousemove', this.mouseMoveLeftEdge)
    window.addEventListener('mouseup', this.handleMouseUpLeftEdge)
  }

  mouseMoveLeftEdge(e: MouseEvent) {
    const currentWidth = this.memo.width
    const currentX = this.memo.x
    const target = document.getElementById(this.targetId)
    const leftPrefix = target?.getBoundingClientRect().left ?? 0
    const newX = e.clientX - this.shiftX - (leftPrefix)
    const fixX = newX < 0 ? 0 : newX
    const changeWidth = newX < 0  ? 0 : newX - currentX
    const newWidth = currentWidth - changeWidth
    this.dragEndEdgeEmit({
      ...this.memo,
      x: fixX,
      width: newWidth
    })
  }

  handleMouseUpLeftEdge() {
    document.removeEventListener("mousemove", this.mouseMoveLeftEdge)
    window.removeEventListener('mouseup', this.handleMouseUpLeftEdge)
  }

  handleMouseDownRightEdge(e: MouseEvent) {
    this.shiftX = e.clientX - this.$refs.stickyMemo.getBoundingClientRect().left
    const target = document.getElementById(this.targetId)
    target?.append(this.$refs.stickyMemo)
    document.addEventListener('mousemove', this.mouseMoveRightEdge)
    window.addEventListener('mouseup', this.handleMouseUpRightEdge)
  }

  mouseMoveRightEdge(e: MouseEvent) {
    const x = this.memo.x
    const target = document.getElementById(this.targetId)
    const leftPrefix = target?.getBoundingClientRect().left ?? 0
    const rightEdge = (target?.offsetWidth ?? 0)
    const newWidth = e.clientX - x - leftPrefix
    const fixWidth = newWidth + x  > rightEdge ? rightEdge - x : newWidth
    this.dragEndEdgeEmit({
      ...this.memo,
      width: fixWidth
    })
  }

  handleMouseUpRightEdge() {
    document.removeEventListener("mousemove", this.mouseMoveRightEdge)
    window.removeEventListener('mouseup', this.handleMouseUpRightEdge)
  }

  handleMouseDownBottom(e: MouseEvent) {
    this.shiftY = e.clientY - this.$refs.stickyMemo.getBoundingClientRect().top
    const target = document.getElementById(this.targetId)
    target?.append(this.$refs.stickyMemo)
    document.addEventListener('mousemove', this.mouseMoveBottomEdge)
    window.addEventListener('mouseup', this.handleMouseUpBottomEdge)
  }

  mouseMoveBottomEdge(e: MouseEvent) {
    const y = this.memo.y
    const target = document.getElementById(this.targetId)
    const topPrefix = target?.getBoundingClientRect().top ?? 0
    const bottomEdge = (target?.offsetHeight ?? 0)
    const newHeight = e.clientY - y - topPrefix
    const fixHeight = newHeight + y > bottomEdge ? bottomEdge - y : newHeight
    this.dragEndEdgeEmit({
      ...this.memo,
      height: fixHeight
    })
  }

  handleMouseUpBottomEdge() {
    document.removeEventListener('mousemove', this.mouseMoveBottomEdge)
    window.removeEventListener('mouseup', this.handleMouseUpBottomEdge)
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
  box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)!important;
  display: flex;
  flex-direction: column;
}
.sticky-memo-content {
  flex-grow: 1;
}
.left, .right {
  width: 4px;
  background-color: transparent;
  cursor: ew-resize;
}
.bottom {
  height: 4px;
  background-color: transparent;
  cursor: ns-resize;
}
</style>
