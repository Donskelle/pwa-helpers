<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { setupPreventPwaInstallPromptListener, addInstallAvailableObserver } from './';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const isInstallAvailable = ref<BeforeInstallPromptEvent>();

// SETUP Listener
onMounted(() => {
  setupPreventPwaInstallPromptListener();
  addInstallAvailableObserver((event) => (isInstallAvailable.value = event));
});
// Make PWA installable
onMounted(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
});

const triggerInstallPrompt = async () => {
  if (!isInstallAvailable.value) {
    return;
  }
  isInstallAvailable.value.prompt();
  const { outcome } = await isInstallAvailable.value?.userChoice;
  if (outcome === 'accepted') {
    console.log('User accepted the install prompt');
  }
};
</script>

<template>
  <button v-if="!!isInstallAvailable" @click="triggerInstallPrompt">
    Install
  </button>
</template>
