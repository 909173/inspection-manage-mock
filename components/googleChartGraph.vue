<template>
  <div>
    <google-chart data="[['a', 'b'], [1,2], [2,3]]"></google-chart>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import  "@google-web-components/google-chart"
@Component({
  name: "googleChartGraph"
})
export default class extends Vue {
}
</script>

<style>

</style>
