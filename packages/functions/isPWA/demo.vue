<script setup lang="ts">
import { isPWA } from './';
</script>

<template>
  <div v-if="isPWA()">
    App is shown as PWA
  </div>
  <div v-else>
    App is not shown as PWA
  </div>
</template>
