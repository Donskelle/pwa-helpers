<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { isPWA } from './';

const isPwa = ref(false);

onMounted(() => (isPwa.value = isPWA()));
</script>

<template>
  <div v-if="isPwa">
    App is shown as PWA
  </div>
  <div v-else>
    App is not shown as PWA
  </div>
</template>
