<template>
  <div>
    <div id="c3-graph"></div>
    <v-radio-group :column="false" :value="'both'" @change="changeViewEye">
      <v-radio label="右眼" value="right"/>
      <v-radio label="左眼" value="left"/>
      <v-radio label="両眼" value="both"/>
    </v-radio-group>
    <v-radio-group :column="false" :value="30" @change="changeMax">
      <v-radio label="30" :value="30"></v-radio>
      <v-radio label="50" :value="50"></v-radio>
      <v-radio label="80" :value="80"></v-radio>
    </v-radio-group>
    <v-radio-group :column="false" :value="'all'" @change="changeGraphDataRange">
      <v-radio label="全期間" :value="'all'"></v-radio>
      <v-radio label="5年" :value="5"></v-radio>
      <v-radio label="3年" :value="3"></v-radio>
      <v-radio label="1年" :value="1"></v-radio>
      <v-radio label="半年" :value="0.5"></v-radio>
    </v-radio-group>
    <v-btn @click="handleClickPrint">印刷</v-btn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {ChartAPI, generate} from "c3"
import { Prop } from "vue-property-decorator";
import dayjs from "dayjs"
import { IntraocularPressureTest } from "~/pages/graph.vue";

@Component({
  name: "c3jsGraph"
})
export default class extends Vue{
  c3Graph: ChartAPI = {} as ChartAPI
  @Prop() graphData!: IntraocularPressureTest[]

  changeGraphDataRange(range: "all" | number) {
    let graphData: IntraocularPressureTest[]
    if (range === "all") {
      graphData = this.graphData
    } else {
      const today = dayjs()
      const targetDate = today.subtract(range, "year")
      graphData = this.graphData.filter(x => {
        const testDate = dayjs(x.testDate)
        return testDate.diff(targetDate, "day", false) >= 0
      })
    }
    this.c3Graph.load({
      columns: [
        ["testDate", ...graphData.map(x => x.testDate)],
        ["左眼", ...graphData.map(x => x.left ?? 0)],
        ["右眼", ...graphData.map(x => x.right ?? 0)]
      ]
    })
  }

  changeViewEye(eye: "right" | "left" | "both") {
    switch(eye) {
      case "right":
        this.c3Graph.hide(["左眼", "右眼"])
        this.c3Graph.show(["右眼"])
        break
      case "left":
        this.c3Graph.hide(["左眼", "右眼"])
        this.c3Graph.show(["左眼"])
        break
      case "both":
        this.c3Graph.show(["左眼", "右眼"])
        break
    }
  }

  changeMax(max: number) {
    this.c3Graph.axis.max({
      y: max
    })
  }


  mounted() {
    this.c3Graph = generate({
      bindto: "#c3-graph",
      data: {
        x: "testDate",
        xFormat: "%Y/%m/%d",
        columns:[
          ["testDate", ...this.graphData.map(x => x.testDate)],
          ["左眼", ...this.graphData.map(x => x.left ?? 0)],
          ["右眼", ...this.graphData.map(x => x.right ?? 0)]
        ],
        labels: true
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%Y/%m/%d"
          },
          label: {
            text: "検査日",
            position: "outer-center"
          }
        },
        y: {
          label: {
            text: "mmHg",
            position: 'outer-middle',
          },
          max: 30,
          padding: {top: 0, }
        }
      }
    })
  }

  async handleClickPrint() {
    await (this as any).$htmlToPaper("c3-graph")
  }
}
</script>
