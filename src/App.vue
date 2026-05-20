<template>
  <GameHeader />
  <div class="game-container">
    <GameFigure
      :wrong-letters-count="wrongLetters.length"
    />
    <GameWrongLetters
      v-if="wrongLetters.length"
      :wrongLetters="wrongLetters"
    />
    <GameWord
      :word="word"
      :correctLetters="correctLetters"
    />
  </div>

  <GamePopup
    ref="popup"
    :word="word"
    @restart="restart"
  />

  <GameNotification
    ref="notification"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import GameHeader from '@/components/GameHeader.vue'
import GameFigure from '@/components/GameFigure.vue'
import GameWrongLetters from '@/components/GameWrongLetters.vue'
import GameWord from '@/components/GameWord.vue'
import GamePopup from '@/components/GamePopup.vue'
import GameNotification from '@/components/GameNotification.vue'
import { useRandomWord } from '@/composables/useRandomWord.ts'

const {word, getRandomWord} = useRandomWord()
const letters = ref<string[]>([]);
const notification = ref<InstanceType<typeof GameNotification> | null>(null)
const popup = ref<InstanceType<typeof GamePopup> | null>(null)
const isGameOver = ref(false)

const correctLetters = computed((): string[] => letters.value.filter(l => word.value.includes(l)))
const wrongLetters = computed((): string[] => letters.value.filter(l => !word.value.includes(l)))


watch(wrongLetters, () => {
  if (wrongLetters.value.length >= 6) {
    isGameOver.value = true;
    popup.value?.open('lose');
  }
})

watch(correctLetters, () => {
  if ([...word.value].every((w: string) => correctLetters.value.includes(w))) {
    isGameOver.value = true;
    popup.value?.open('win');
  }
})

const handleKeydown = (event: KeyboardEvent) => {
  if (isGameOver.value) return;
  const key = event.key.toLowerCase()

  if (letters.value.includes(key)) {
    notification.value?.open()
    return;
  }

  if (/[а-яА-ЯёЁ]/.test(key)) {
    letters.value.push(key);
  }
}

const restart = async () => {
  await getRandomWord();
  letters.value = [];
  popup.value?.close();
  isGameOver.value = false;
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped></style>
