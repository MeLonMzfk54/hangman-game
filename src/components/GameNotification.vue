<template>
  <div class="notification-container" :class="{show: isVisible}">
    <p>{{ message }}</p>
  </div>
</template>
<script setup lang="ts">
import {ref, onUnmounted} from 'vue';

const message = ref<string>('');
const isVisible = ref<boolean>(false);


let timeoutId: ReturnType<typeof setTimeout> | null = null

const open = (msg: string): void => {
  isVisible.value = true;
  message.value = msg;
  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  timeoutId = setTimeout(() => {
    isVisible.value = false
    timeoutId = null
  }, 2000)
}
const close = () => {
  isVisible.value = false;
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
}

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})

defineExpose({
  open,
  close
})
</script>