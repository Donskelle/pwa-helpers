<template>
  <template v-if="isSupported">
    <slot />
    <p class="demo-suppored-badge">
      beforeinstallprompt is supported
    </p>
  </template>
  <p v-else>
    Your browser doen't support that feature.
  </p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import './';

const isSupported = ref(false);

onMounted(() => {
  isSupported.value = typeof BeforeInstallPromptEvent === 'function';
});
</script>
