<template>
  <div class="demo wide">
    <slot />
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue';
const error = ref<Error>();
onErrorCaptured((err) => {
  error.value = err;
});
</script>
