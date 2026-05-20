<template>
  <GameHeader />
  <div class="game-container">
    <GameFigure />
    <GameWrongLetters
      v-if="wrongLetters.length"
      :wrongLetters="wrongLetters"
    />
    <GameWord
      :word="word"
      :correctLetters="correctLetters"
    />
  </div>

  <GamePopup v-if="false" />

  <GameNotification
    ref="notification"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import GameHeader from '@/components/GameHeader.vue'
import GameFigure from '@/components/GameFigure.vue'
import GameWrongLetters from '@/components/GameWrongLetters.vue'
import GameWord from '@/components/GameWord.vue'
import GamePopup from '@/components/GamePopup.vue'
import GameNotification from '@/components/GameNotification.vue'

const word = ref<string>('василий');
const letters = ref<string[]>([]);
const notification = ref<InstanceType<typeof GameNotification> | null>(null)

const correctLetters = computed((): string[] => letters.value.filter(l => word.value.includes(l)))
const wrongLetters = computed((): string[] => letters.value.filter(l => !word.value.includes(l)))

const handleKeydown = (event: KeyboardEvent) => {
  const { key } = event;

  if (letters.value.includes(key)) {
    notification.value?.open()
    return;
  }

  if (/[а-яА-ЯёЁ]/.test(key)) {
    letters.value.push(key.toLowerCase());
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped></style>
