import { computed, ref, type Ref } from 'vue'

export const useLetters = (word: Ref<string>) => {
  const letters = ref<string[]>([]);
  const correctLetters = computed((): string[] => letters.value.filter(l => word.value.includes(l)));
  const wrongLetters = computed((): string[] => letters.value.filter(l => !word.value.includes(l)));

  const addLetter = (key: string): void => {
    if (/[а-яА-ЯёЁ]/.test(key)) {
      letters.value.push(key);
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