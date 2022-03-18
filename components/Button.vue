<template>
  <v-btn class="button" :outlined="buttonOutlined"  :color="buttonColor">{{buttonLabel}}</v-btn>
</template>

<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"
import { Prop } from "vue-property-decorator"

@Component({ name: "button" })
export default class extends Vue {
  @Prop() buttonLabelProp!: string
  @Prop() buttonColorProp!: string
  @Prop() buttonOutlinedProp!: boolean

  get buttonLabel() {
    return this.buttonLabelProp
  }

  get buttonColor() {
    return this.buttonColorProp
  }

  get buttonOutlined() {
    return this.buttonOutlinedProp
  }
}
</script>
<style scoped>
.button {
  width: 150px;
}
</style>
