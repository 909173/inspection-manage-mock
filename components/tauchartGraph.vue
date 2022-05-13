<template>
  <div>
    <div id="tauchart-graph"></div>
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
import {Chart, api } from "taucharts"
import { Component, Prop } from "vue-property-decorator";
import { IntraocularPressureTest } from "~/pages/graph.vue";
import "taucharts/dist/plugins/tooltip"
import "taucharts/dist/plugins/legend"

@Component({
  name: "tauchartGraph"
})
export default class extends Vue{
  chart: Chart = {} as Chart
  @Prop() graphData!: IntraocularPressureTest[]

  get chartGraphData() {
    return this.graphData.reduce((a,b) => a.concat([
      {
        "眼": "左眼",
        "検査日": b.testDate,
        mmHg: b.left ?? 0
      }, {
        "眼": "右眼",
        "検査日": b.testDate,
        mmHg: b.right ?? 0
      }
    ]), [] as { "眼": string; "検査日": string; mmHg: number}[])
  }

  changeViewEye() {}
  changeMax() {}
  changeGraphDataRange() {}

  mounted() {
    this.chart = new Chart({
      type: "line",
      x: "検査日",
      y: "mmHg",
      data: this.chartGraphData,
      color: "眼",
      settings: {
        minChartHeight: -10
      },
      guide: {
        color: {
          brewer: { "左眼": '#ff0000', "右眼": "#00ff00" }
        }
      },
      plugins: [
        api.plugins.get("legend")(),
        api.plugins.get("tooltip")()
      ],
    })
    this.chart.renderTo("#tauchart-graph")
  }

  async handleClickPrint() {
    await (this as any).$htmlToPaper("tauchart-graph")
  }
}
</script>

<style scoped>
#tauchart-graph {
  height: 600px;
}
</style>
