<template>
  <div class="task-container d-flex">
    <div class="flex-grow-1">
      <div class="waiting-container">
        waiting
      </div>
    </div>
    <v-divider vertical />
      <div class="flex-grow-1">
        <div class="progress-container">
          progress
        </div>
      </div>
    <v-divider vertical />
    <div class="flex-grow-1">
      <div class="complete-container">
        complete
      </div>
    </div>
  </div>
</template>

<script lang="ts">
</script>

<style lang="stylus" scoped>
.waiting-container
  height 100%
.progress-container
  height 100%
.complete-container
  height 100%
</style>
