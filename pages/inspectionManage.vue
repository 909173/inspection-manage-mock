<template>
  <div>
    <v-row>
      <v-simple-table>
        <template #default>
          <tbody>
            <tr v-for="y in yMax" :key="y">
              <td v-for="x in xMax" :key="x" class="pa-1">
                <div class="empty-cell"></div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
type ContentType = "label" | "checkBox" | "textField"
type Position = {
  x: number,
  y: number
}
type Label =  Position & {
  value: string
  type: "label"
}
type InputBase = Position & {
  type: ContentType
  name: string
  physicalName: string
}
type TextFieldType = "normal" | "number"
type TextFieldBase = InputBase & {
  type: "textField"
  textFieldType: TextFieldType
}
type TextFieldNormal = TextFieldBase & {
  textFieldType: "normal"
}
type TextFieldNumber = TextFieldBase & {
  tick: number
  isUseGraph: boolean
  textFieldType: "number"
}
type CheckBox = InputBase & {
  type: "checkBox"
}
type InspectionComponent = Label | TextFieldNormal | TextFieldNumber | CheckBox
export default class extends Vue {
  contents: InspectionComponent[] = [{
    x: 0,
    y: 0,
    type: "label",
    value: "RV="
  }]

  xMaxDefault = 6
  yMaxDefault = 6

  get xMax() {
    const xMax = this.contents.reduce((a,b) => a.x > b.x ? a : b).x
    return xMax > this.xMaxDefault ? xMax : this.xMaxDefault
  }

  get yMax() {
    const yMax = this.contents.reduce((a,b) => a.y > b.y ? a : b).y
    return yMax > this.yMaxDefault ? yMax : this.yMaxDefault
  }
}
</script>

<style scoped>
.empty-cell {
  width: 200px;
  height: 50px;
  border: solid 1px white;
}
</style>
