<script setup lang="ts">
import { ref } from 'vue';
import { isPWA } from './';

const pwaStatus = ref<boolean>(isPWA());
</script>

<template>
  <div v-if="pwaStatus">
    App is shown as PWA
  </div>
  <div else>
    App is not shown as PWA
  </div>
</template>
