<template>
  <canvas ref="graphCanvas"></canvas>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { CategoryScale, Chart, ChartConfiguration, LinearScale, LineController, LineElement, PointElement, TimeScale, Title } from "chart.js"
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

  get chartItem(): ChartConfiguration {
    return {
      data: {
        datasets: [
          {
            data: this.graphData.map(x =>  x.left ?? 0),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: "rgb(255, 99, 132)",
            label: "左目",
          }, {
            data: this.graphData.map(x => x.right ?? 0),
            borderColor: 'rgb(132, 99, 255)',
            backgroundColor: 'rgb(132, 99, 255)',
            label: "右目"
          }
        ],
        labels: this.graphData.map(x => x.testDate)
      },
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              tooltipFormat: "YYYY/MM/DD",
              unit: "day",
              stepSize: 1,
              displayFormats: {
                "day": "YYYY/MM/DD"
              }
            }
          }
        }
      },
      type: "line",
    }
  }

  mounted() {
    Chart.register(LineController, CategoryScale,TimeScale, LinearScale, PointElement, LineElement, Title)
    this.intraocularPressureGraph = new Chart(this.$refs.graphCanvas, this.chartItem)
  }
}
</script>
