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
      <div class="left"/>
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
  @Emit("dragend") dragEndEmit(eve: {x: number, y: number}) {}

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

  isMouseXInBox() {
    return  this.shiftX > 2
      && this.shiftX < this.memo.width -2
  }

  isMouseYInBox() {
    return this.shiftY > 2
    && this.shiftY < this.memo.height - 2
  }

  handleMouseDown(e: MouseEvent) {
    const target = document.getElementById(this.targetId)
    this.shiftX = e.clientX - this.$refs.stickyMemo.getBoundingClientRect().left
    this.shiftY = e.clientY - this.$refs.stickyMemo.getBoundingClientRect().top
    if (this.isMouseXInBox() && this.isMouseYInBox()) {
      target?.append(this.$refs.stickyMemo)

      this.moveAt(e)
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
