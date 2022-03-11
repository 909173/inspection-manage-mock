<template>
  <div>
    <v-tabs v-model="tab" grow>
      <v-tab v-for="graphTool in graphTools" :key="graphTool">
        {{ graphTool}}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="graphTool in graphTools" :key="graphTool">
        <v-card>
          <v-card-text>
            {{ graphTool }}
          </v-card-text>
          <ChartJsGraph v-if="graphTool=== 'chart.js'" :graph-data="graphData"></ChartJsGraph>
          <C3JsGraph v-if="graphTool === 'C3.js'" :graph-data="graphData"></C3JsGraph>

        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component"
import ChartJsGraph from "@/components/chartjsGraph.vue"
import C3JsGraph from "@/components/c3jsGraph.vue"
const graphTools = ["chart.js", "C3.js", "Google Charts"] as const
export type GraphTools = typeof graphTools[number]
export type IntraocularPressureTest = {
  testDate: string
  left?: number
  right?: number
}

@Component({
  name: "graph",
  components: {
    ChartJsGraph,
    C3JsGraph
  }
})
export default class extends Vue {
  tab: GraphTools = "chart.js"
  graphTools = graphTools
  graphData: IntraocularPressureTest[] = [
    {
      testDate: "2021/9/21",
      left: 8.9,
      right: 11.0
    }, {
      testDate: "2021/10/21",
      left: 9.9,
      right: 12.1
    }, {
      testDate: "2021/12/21",
      left: 17.4,
      right: 24.4
    }, {
      testDate: "2022/1/21",
      left: 17.6,
      right: 20.0
    }, {
      testDate: "2022/2/21",
      left: 21.4,
      right: 18.6
    }, {
      testDate: "2022/3/21",
      left: 26.0,
      right: 16.1
    }
  ]
}
</script>
