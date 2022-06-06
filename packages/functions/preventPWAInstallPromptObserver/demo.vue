<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { setupPreventPWAInstallPromptObserver, addPreventPWAInstallPromptObserver } from './';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const isInstallAvailable = ref<BeforeInstallPromptEvent>();
const removeObserver = ref<() => void>();

onMounted(() => {
  // setup observer and event listener
  setupPreventPWAInstallPromptObserver();

  // Add observer
  removeObserver.value = addPreventPWAInstallPromptObserver(
    (event) => (isInstallAvailable.value = event)
  );

  // Make PWA installable (if not already installed)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
});

// Remove Observer
onUnmounted(() => removeObserver.value?.());

const triggerInstallPrompt = async () => {
  if (!isInstallAvailable.value) {
    return;
  }
  isInstallAvailable.value.prompt();
  const { outcome } = await isInstallAvailable.value.userChoice;
  if (outcome === 'accepted') {
    console.log('User accepted the install prompt');
  }
};
</script>

<template>
  <button v-if="!!isInstallAvailable" @click="triggerInstallPrompt">
    Install
  </button>
  <div v-else>
    <p>
      Install prompt event was not send.
    </p>
    <p>
      Maybe it was send before this site setup a listener for it. Reload if thats the case.
    </p>
  </div>
</template>
