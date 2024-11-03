<template>
  <div>
    <h1>DEMO2</h1>
    <h1>{{ res }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const res = 'Hello World'
    return {
      res
    };
  },
});
</script>

<style scoped>
/* 添加一些样式 */
</style>
