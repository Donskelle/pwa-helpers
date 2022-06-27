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
  if (!isInstallAvailable.value) return;
  
  isInstallAvailable.value.prompt();
  const { outcome } = await isInstallAvailable.value.userChoice;
  if (outcome === 'accepted') {
    console.log('User accepted the install prompt');
  }
};
const reload = () => window.location.reload();
</script>

<template>
  <button v-if="!!isInstallAvailable" @click="triggerInstallPrompt">
    Install
  </button>
  <template v-else>
    <p>
      beforeinstallprompt was not send. Possible Reasons:
    </p>
    <ul>
      <li>
        The Event was send before this page has setup a listener for it. <a href="#" @click="reload">Reload</a> if thats the case
      </li>
      <li>
        The web app is already installed
      </li>
      <li>
        Doens't meet the user engagement heuristics:
        <ul>
          <li>
            The user needs to have clicked or tapped on the page at least once (at any time, even
            during a previous page load)
          </li>
          <li>The user needs to have spent at least 30 seconds viewing the page (at any time)</li>
        </ul>
      </li>
    </ul>
  </template>
</template>

<style scoped></style>
