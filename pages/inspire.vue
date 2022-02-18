<template>
  <div>
    <v-row>
      <v-col >
        <div contenteditable="true" class="content-editable">
          <v-spacer></v-spacer>
          <v-btn icon contenteditable="false">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-textarea>
        <template #append>
          <v-icon>mdi-plus</v-icon>
        </template>
      </v-textarea>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'InspirePage',
}
</script>

<style scoped>
.content-editable {
  background: darkslategrey;
  color: white;
}
</style>
