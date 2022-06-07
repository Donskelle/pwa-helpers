<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { updateFoundCallback } from './';

const updateAvailable = ref<() => void>();
const showInstallSW1 = ref(false);
const showInstallSW2 = ref(false);

const installSW = (url: string) => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(url, { scope: '/' });
  }
};

onMounted(async () => {
  updateFoundCallback((triggerUpdateAndReload) => {
    updateAvailable.value = triggerUpdateAndReload;
  });

  // Show hide install button depending if already active
  const reg = await navigator.serviceWorker.getRegistration();

  showInstallSW1.value =
    reg?.active?.scriptURL.includes('sw.js') || reg?.waiting?.scriptURL.includes('sw.js')
      ? false
      : true;
  showInstallSW2.value =
    reg?.active?.scriptURL.includes('sw2.js') || reg?.waiting?.scriptURL.includes('sw2.js')
      ? false
      : true;
});
</script>

<template>
  <button v-if="!!updateAvailable" @click="() => updateAvailable?.()">
    Update App and reload
  </button>
  <button
    v-if="showInstallSW1"
    @click="
      () => {
        installSW('/sw.js');
        showInstallSW1 = false;
      }
    "
  >
    Install SW 1
  </button>
  <button
    v-if="showInstallSW2"
    @click="
      () => {
        installSW('/sw2.js');
        showInstallSW2 = false;
      }
    "
  >
    Install SW 2
  </button>
</template>

<style scoped>
button {
  margin-right: 0.5rem;
}
</style>
