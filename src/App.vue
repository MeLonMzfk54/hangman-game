<template>
  <GameHeader />
  <div class="game-container">
    <GameFigure />
    <GameWrongLetters />
    <GameWord
      :word="word"
      :correctLetters="correctLetters"
    />
  </div>

  <GamePopup v-if="false" />

  <GameNotification />
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

const correctLetters = computed((): string[] => letters.value.filter(l => word.value.includes(l)))

const handleKeydown = (event: KeyboardEvent) => {
  const { key } = event;
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
