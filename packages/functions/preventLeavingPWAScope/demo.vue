<script setup lang="ts">
import { onMounted } from 'vue';
import { preventLeavingPWAScope } from './';

onMounted(preventLeavingPWAScope);
</script>

<template>
  <a href="https://google.de">Link to google.de without target attribute</a> <br /><br />
  <a href="/">Relative Link</a>
</template>
