<template>
  <div id="vuetify-app">
    <stickyMemoArea></stickyMemoArea>
  </div>
</template>

<script lang="ts">
import stickyMemoArea from "@/components/stickyMemoArea.vue"
export default {
  name: 'StickyMemoPage',
  components: {
    stickyMemoArea
  }
}
</script>

<style scoped>
.content-editable {
  background: darkslategrey;
  color: white;
}
</style>
