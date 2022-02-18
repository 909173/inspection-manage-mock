<template>
  <div
    ref="stickyMemo"
    class="sticky-memo pa-0"
    :style="{
      left: `${memo.x}px`,
      top: `${memo.y}px`
    }"
    @mousedown="handleMouseDown2"
    @mouseup="handleMouseUp"
  >
    <div class="d-flex align-center sticky-memo-header px-2">
      <v-btn icon color="black" @click="handleClickAddButton">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      {{ memo.info.title }}
      <v-spacer />
      <v-btn icon @click="handleClickMinimum">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <div class="sticky-memo-content px-2">
      <v-textarea v-model="text"></v-textarea>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Emit, Prop } from 'vue-property-decorator'
import { StickyMemo } from '~/types/stickyMemo'
@Component
export default class extends Vue {
  isVisible: boolean = true
  '$refs': {
    stickyMemo: HTMLElement
  }

  shiftX = 0
  shiftY = 0
  @Prop({ required: true }) memo!: StickyMemo
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Emit("dragend") dragEndEmit(eve: {x: number, y: number}) {}
  handleDrag(e: DragEvent) {
    this.moveAt(e.pageX, e.pageY)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Emit("change-text") changeTextEmit(text: string) {}

  get text() {
    return this.memo.info?.content ?? ""
  }

  set text(str: string) {
    this.changeTextEmit(str)
  }

  handleMouseDown() {
    this.$refs.stickyMemo.style.position = 'absolute'
  }

  handleDragStart(e: DragEvent) {
    e.dataTransfer?.setDragImage(new Image(), 0,0)
  }

  moveAt(pageX: number, pageY: number) {
    this.dragEndEmit({
      x: pageX - this.shiftX,
      y: pageY - this.shiftY
    })
  }

  onMouseMove(event: MouseEvent) {
    this.moveAt(event.pageX, event.pageY)
  }

  handleMouseDown2(e: MouseEvent) {
    this.shiftX = e.clientX - this.$refs.stickyMemo.getBoundingClientRect().left
    this.shiftY = e.clientY - this.$refs.stickyMemo.getBoundingClientRect().top

    const nuxt = document.getElementById("vuetify-app")
    nuxt?.append(this.$refs.stickyMemo)
    this.moveAt(e.pageX, e.pageY)
    document.addEventListener('mousemove', this.onMouseMove)
  }

  handleMouseUp() {
    document.removeEventListener('mousemove', this.onMouseMove)
    this.$refs.stickyMemo.onmouseup = null
  }

  mounted() {
    this.$refs.stickyMemo.ondragstart = () => false
  }

  handleClickMinimum() {

  }

  handleClickAddButton() {}
}
</script>

<style scoped>
.sticky-memo-header {
  background-color: yellow;
  display: flex;
  width: 100%;
  color: black;
}
.sticky-memo {
  position: absolute;

  z-index: 2;
  background-color: white;
  color:black;
  box-shadow: 0 7px 8px -4px rgba(0,0,0,.2),0 12px 17px 2px rgba(0,0,0,.14),0 5px 22px 4px rgba(0,0,0,.12)!important;
}
</style>
