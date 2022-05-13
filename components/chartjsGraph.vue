<template>
  <div>
    <canvas id="printme" ref="graphCanvas"></canvas>
    <v-radio-group v-model="displayEye" :column="false" :value="'both'" @change="changeViewEye">
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
import { Prop } from "vue-property-decorator";
import { CategoryScale, Chart, ChartConfiguration, LinearScale, LineController, LineElement, PointElement, TimeScale, Title } from "chart.js"
import dayjs from "dayjs";
import { IntraocularPressureTest } from "~/pages/graph.vue";
import 'chartjs-adapter-moment'
@Component({
  name: "chart-js"
})
export default class extends Vue{
  @Prop() graphData!: IntraocularPressureTest[]
  intraocularPressureGraph: Chart = {} as Chart
  "$refs": {
    graphCanvas: HTMLCanvasElement
  }

  displayEye: "left" | "right" | "both" = "both"
  get chartItem(): ChartConfiguration {
    return {
      data: {
        datasets: [
          {
            data: this.graphData.map(x =>  x.left ?? 0),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: "rgb(255, 99, 132)",
            label: "左眼",
          }, {
            data: this.graphData.map(x => x.right ?? 0),
            borderColor: 'rgb(132, 99, 255)',
            backgroundColor: 'rgb(132, 99, 255)',
            label: "右眼"
          }
        ],
        labels: this.graphData.map(x => x.testDate)
      },
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              // tooltipFormat: "YYYY/MM/DD",
              // unit: "day",
              stepSize: 1,
              // displayFormats: {
              //   "day": "YYYY/MM/DD"
              // }
            }
          },
          y: {
            max: 30
          }
        }
      },
      type: "line",
    }
  }

  changeGraphDataRange(range: "all" | number) {
    let graphData:IntraocularPressureTest[] = []
    if (range === "all") {
      graphData = this.graphData
    }
    else {
      const today = dayjs()
      const targetDate = today.subtract(range, "year")
      graphData = this.graphData.filter(x => {
        const testDate = dayjs(x.testDate)
        return testDate.diff(targetDate, "day", false) >= 0
      })
    }
    this.intraocularPressureGraph.data.datasets = []
    this.intraocularPressureGraph.data.labels = []
    if (this.displayEye === "left" || this.displayEye === "both") {
      this.intraocularPressureGraph.data.datasets.push(
        {
          data: graphData.map(x =>  x.left ?? 0),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: "rgb(255, 99, 132)",
          label: "左眼"
        }
      )
    }
    if (this.displayEye === "right" || this.displayEye === "both") {
      this.intraocularPressureGraph.data.datasets.push(
        {
          data: graphData.map(x => x.right ?? 0),
          borderColor: 'rgb(132, 99, 255)',
          backgroundColor: 'rgb(132, 99, 255)',
          label: "右眼"
        }
      )
    }
    this.intraocularPressureGraph.data.labels =
      graphData.map(x => x.testDate)

    this.intraocularPressureGraph.update()
  }

  changeMax(max: number) {
    this.intraocularPressureGraph.options.scales = {
      ...this.intraocularPressureGraph.options.scales,
      y: {
        max
      }
    }
    this.intraocularPressureGraph.update()
  }

  changeViewEye(arg: "left" | "right" | "both" ) {
    this.intraocularPressureGraph.data.datasets = []
    if (arg === "left" || arg === "both") {
      this.intraocularPressureGraph.data.datasets.push(
        {
          data: this.graphData.map(x =>  x.left ?? 0),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: "rgb(255, 99, 132)",
          label: "左眼"
        }
      )
    }
    if (arg === "right" || arg === "both") {
      this.intraocularPressureGraph.data.datasets.push(
        {
          data: this.graphData.map(x => x.right ?? 0),
          borderColor: 'rgb(132, 99, 255)',
          backgroundColor: 'rgb(132, 99, 255)',
          label: "右眼"
        }
      )
    }
    this.intraocularPressureGraph.update()
  }

  async handleClickPrint() {
    await (this as any).$htmlToPaper("printme")
  }

  mounted() {
    Chart.register(LineController, CategoryScale,TimeScale, LinearScale, PointElement, LineElement, Title)
    this.intraocularPressureGraph = new Chart(this.$refs.graphCanvas, this.chartItem)
  }
}
</script>
