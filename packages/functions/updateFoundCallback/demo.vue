<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { updateFoundCallback } from './';

enum InstallableServiceWorkers {
  first = '/sw.js',
  second = '/sw2.js',
}

const triggerUpdate = ref<(options?: { reload: boolean }) => void>();
const showInstallSW1 = ref(false);
const showInstallSW2 = ref(false);

// Install different Service Worker to trigger update
const installSW = (url: InstallableServiceWorkers) => {
  navigator.serviceWorker.register(url, { scope: '/' });
};
onMounted(async () => {
  updateFoundCallback((_triggerUpdate) => {
    triggerUpdate.value = _triggerUpdate;
  });

  // Show hide install button depending if already active
  const reg = await navigator.serviceWorker.getRegistration();
  showInstallSW1.value =
    reg?.active?.scriptURL.includes(InstallableServiceWorkers.first) ||
    reg?.waiting?.scriptURL.includes(InstallableServiceWorkers.first)
      ? false
      : true;
  showInstallSW2.value =
    reg?.active?.scriptURL.includes(InstallableServiceWorkers.second) ||
    reg?.waiting?.scriptURL.includes(InstallableServiceWorkers.second)
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
        installSW(InstallableServiceWorkers.first);
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
        installSW(InstallableServiceWorkers.second);
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
