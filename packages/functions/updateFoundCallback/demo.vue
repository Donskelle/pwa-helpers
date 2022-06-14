<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { updateFoundCallback } from './';

const triggerUpdate = ref<(options?: { reload: boolean }) => void>();
const showInstallSW1 = ref(false);
const showInstallSW2 = ref(false);

// Install different Service Worker to trigger update
const installSW = (url: string) => {
  navigator.serviceWorker.register(url, { scope: '/' });
};
onMounted(async () => {
  updateFoundCallback((_triggerUpdate) => {
    triggerUpdate.value = _triggerUpdate;
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
  <button v-if="!!triggerUpdate" @click="() => triggerUpdate?.({ reload: true })">
    Activate installed Service Worker and reload
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
    Install Service Worker 1
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
    Install Service Worker 2
  </button>
</template>

<style scoped>
button {
  margin-right: 0.5rem;
}
</style>
