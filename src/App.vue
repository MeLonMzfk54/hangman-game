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

const word = ref<string>('василий');
const letters = ref<string[]>([]);
const notification = ref<InstanceType<typeof GameNotification> | null>(null)
const popup = ref<InstanceType<typeof GamePopup> | null>(null)

const correctLetters = computed((): string[] => letters.value.filter(l => word.value.includes(l)))
const wrongLetters = computed((): string[] => letters.value.filter(l => !word.value.includes(l)))

watch(wrongLetters, () => {
  if (wrongLetters.value.length >= 6) {
    popup.value?.open('lose');
  }
})

watch(correctLetters, () => {
  if ([...word.value].every((w: string) => correctLetters.value.includes(w))) {
    popup.value?.open('win');
  }
})

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

const restart = () => {
  letters.value = [];
  popup.value?.close();
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped></style>
