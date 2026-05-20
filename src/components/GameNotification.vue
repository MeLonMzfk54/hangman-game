<template>
  <div class="notification-container" :class="{show: isVisible}">
    <p>Вы уже вводили этот символ</p>
  </div>
</template>
<script setup lang="ts">
import {ref, onUnmounted} from 'vue';

const isVisible = ref<boolean>(false);


let timeoutId: ReturnType<typeof setTimeout> | null = null

const open = () => {
  isVisible.value = true;

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