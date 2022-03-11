<template>
 <div>{{title}}</div>
</template>

<script lang="ts">
import {Vue, Component} from "vue-property-decorator"

@Component
export default class extends Vue {
  title: string = "StorybookTest"
}
</script>
