import { computed, ref, type Ref } from 'vue'
import type GameNotification from '@/components/GameNotification.vue'

export const useLetters = (word: Ref<string>, notification: Ref<InstanceType<typeof GameNotification> | null>) => {
  const letters = ref<string[]>([]);
  const correctLetters = computed((): string[] => letters.value.filter(l => word.value.includes(l)));
  const wrongLetters = computed((): string[] => letters.value.filter(l => !word.value.includes(l)));

  const addLetter = (key: string): void => {
    if (/[а-яА-ЯёЁ]/.test(key)) {
      letters.value.push(key);
    } else {
      notification.value?.open('Переключите раскладку клавиатуры на русский язык')
    }
  }

  const resetLetters = (): void => {
    letters.value = [];
  }

  return {
    letters,
    correctLetters,
    wrongLetters,
    addLetter,
    resetLetters
  }
}