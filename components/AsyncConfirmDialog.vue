<template>
  <v-dialog v-model="isActive" persistent max-width="300">
    <v-card>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary">確認</v-btn>
        <v-btn outlined>キャンセル</v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from "vue-property-decorator"
@Component
export default class extends Vue {
  isActive = false
  @Prop() message!: string
  @Prop() success!: () => void
  @Prop() failure!: () => void

  created() {
    const el = document.createElement("div")
    document.getElementsByTagName("body")[0].appendChild(el);
    this.$mount(el);
    this.isActive = true
  }

  destroy() {
    this.isActive = false
    setTimeout(() => {
      this.$el.parentNode?.removeChild(this.$el)
      this.$destroy()
    }, 200)
  }
}
</script>
