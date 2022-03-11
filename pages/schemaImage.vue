<template>
  <div>
    <div class="d-flex">
      <v-radio-group v-model="canvasMode" :column="false">
        <v-radio label="ドローモード" value="draw"/>
        <v-radio label="選択モード" value="select"/>
      </v-radio-group>
    </div>
    <div class="d-flex pa-1">
      <div ref="container" class="canvas-container" />
      <div class="pa-1 d-flex flex-grow-1 flex-wrap">
        <div v-for="i in 10" :key="i">
          <img :src="`https://picsum.photos/id/${i}/300/200`" alt="" @click="handleClickImage(`https://picsum.photos/id/${i}/300/200`)">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Konva from "konva"
import { Vector2d } from 'konva/lib/types'
import Component from 'vue-class-component'
@Component({
  name: "SchemaImage"
})
export default class extends Vue {
  "$refs": {
    container: HTMLDivElement
  }

  actualWidth: number = 0
  actualHeight: number = 0
  drawingLayer = {} as Konva.Layer
  guideLayer = {} as Konva.Layer
  shapeLayer = {} as Konva.Layer
  schemaLayer = {} as Konva.Layer
  stage: Konva.Stage = {} as Konva.Stage
  isPaint = false
  mouseDownPosition: Vector2d | null = null
  mousePosition: Vector2d | null = null
  lastLine = {} as Konva.Line
  canvasMode: "draw" | "select" = "draw"
  mounted() {
    this.init()
  }

  init() {
    const container = this.$refs.container
    this.stage = new Konva.Stage({
      width: 500,
      height: 800,
      container
    })
    this.actualWidth = 500
    this.actualHeight = 800
    this.drawingLayer = new Konva.Layer({ id: "drawingLayer"})
    this.shapeLayer = new Konva.Layer({ id: "shapeLayer" })
    this.stage.add(this.drawingLayer)
    this.stage.add(this.shapeLayer)
    this.shapeLayer.draw()
    this.guideLayer = new Konva.Layer()
    this.stage.add(this.guideLayer)
    this.guideLayer.moveToTop()
    this.schemaLayer = new Konva.Layer()
    this.stage.add(this.schemaLayer)
    this.schemaLayer.moveToBottom()
    this.stage.on("mousedown", this.mouseDown)
    this.stage.on("mousemove", this.mouseMove)
    this.stage.on("mouseup", this.mouseUp)
    this.canvasMode = "draw"
  }

  mouseDown() {
    if (this.canvasMode !== "draw") return
    this.guideLayer.destroyChildren()
    this.guideLayer.draw()
    this.isPaint = true
    this.mouseDownPosition = this.stage.getPointerPosition()
    if (!this.mouseDownPosition) return
    this.lastLine = new Konva.Line({
      stroke: "#111",
      strokeWidth: 11,
      globalCompositeOperation: "source-over",
      points: [
        this.mouseDownPosition.x * (1 / this.stage.scaleX()),
        this.mouseDownPosition.y * (1 / this.stage.scaleX())
      ],
      lineJoin: "round",
      lineCap: "round",
      perfectDrawEnabled: false,
      listening: false,
      shadowForStrokeEnabled: false,
      shadowEnabled: false,
      hitStrokeWidth: 0
    })
    this.drawingLayer.add(this.lastLine)
  }

  mouseMove() {
    if (this.canvasMode !== "draw") return
    if (!this.isPaint) return
    this.guideLayer.destroyChildren()
    this.guideLayer.draw()

    this.mousePosition = this.stage.getPointerPosition()
    if (!this.mousePosition) return
    const newPoints = this.lastLine
      .points()
      .concat([
          this.mousePosition.x * (1 / this.stage.scaleX()),
          this.mousePosition.y * (1 / this.stage.scaleX()),
      ])
    this.lastLine.points(newPoints)
    this.drawingLayer.batchDraw()
  }

  mouseUp() {
    if (this.canvasMode !== "draw") return
    this.isPaint = false
    this.mousePosition = this.stage.getPointerPosition()
    this.lastLine.transformsEnabled("position")
    this.guideLayer.destroyChildren()
    this.guideLayer.draw()
  }

  handleClickImage(src: string) {
    const image = new Image()
    image.src = src
    image.onload = () => {
      const schemaImage = new Konva.Image({
        image,
        x: 0,
        y: 0,
        width: 300,
        heigh: 200,
        draggable: true
      })
      this.schemaLayer.add(schemaImage)
      const shapeTransformer = new Konva.Transformer({
        enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
        boundBoxFunc: (_, newBox) => {
          newBox.width = Math.max(30, newBox.width)
          return newBox
        },
        visible: true,
        anchorSize: 28,
        nodes: [schemaImage]
      })
      // shapeTransformer.nodes([schemaImage])
      this.schemaLayer.add(shapeTransformer)
      schemaImage.on("click", () => {
        this.schemaLayer.getChildren().forEach((transformer) => {
        if (transformer instanceof Konva.Transformer) {
          transformer.anchorFill("transparent")
        }
      })
      })
      // this.stage.add(this.schemaLayer)
      this.schemaLayer.moveToBottom()
      this.canvasMode = "select"
    }
  }
}
</script>
<style scoped>
.canvas-container {
  background-color: white;
  border: solid 1px black;
  position: relative;
  height: 800px;
  width: 500px;
}
</style>
