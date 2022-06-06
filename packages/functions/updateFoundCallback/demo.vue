<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { updateFoundCallback } from './';

const updateAvailable = ref<() => void>();
const showInstallSW1 = ref<boolean>(false);
const showInstallSW2 = ref<boolean>(false);

const installSW = (url: string) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(url, { scope: '/' });
  }
};

onMounted(async () => {
  updateFoundCallback((triggerUpdateAndReload) => {
    console.log(triggerUpdateAndReload);
    updateAvailable.value = triggerUpdateAndReload;
  });

  const reg = await navigator.serviceWorker.getRegistration();
  showInstallSW1.value = !reg?.active?.scriptURL.includes('sw.js') ?? true;
  showInstallSW2.value = !reg?.active?.scriptURL.includes('sw2.js') ?? true;
});
</script>

<template>
  <button v-if="!!updateAvailable" @click="() => updateAvailable?.()">
    Update App and reload
  </button>
  <button v-if="showInstallSW1" @click="() => installSW('/sw.js')">
    Install SW 1
  </button>
  <button v-if="showInstallSW2" @click="() => installSW('/sw2.js')">
    Install SW 2
  </button>
</template>
