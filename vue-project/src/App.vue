<script setup lang="ts"></script>

<template>
  <h1>Виселица</h1>
  <p>Отгадайте имя - введите букву</p>
  <div class="game-container">
    <svg height="250" width="200" class="figure-container">
      <!-- Rod -->
      <line x1="60" y1="20" x2="140" y2="20" />
      <line x1="140" y1="20" x2="140" y2="50" />
      <line x1="60" y1="20" x2="60" y2="230" />
      <line x1="20" y1="230" x2="100" y2="230" />

      <!-- Head -->
      <circle cx="140" cy="70" r="20" />
      <!-- Body -->
      <line x1="140" y1="90" x2="140" y2="150" />
      <!-- Arms -->
      <!-- <line x1="140" y1="120" x2="120" y2="100" />
      <line x1="140" y1="120" x2="160" y2="100" /> -->
      <!-- Legs -->
      <!-- <line x1="140" y1="150" x2="120" y2="180" />
      <line x1="140" y1="150" x2="160" y2="180" /> -->
    </svg>

    <div class="wrong-letters-container">
      <div class="wrong-letters">
        <p>Ошибки</p>
        <span>п , </span>
        <span>м , </span>
        <span>с </span>
      </div>
    </div>

    <div class="word">
      <span class="letter">л</span>
      <span class="letter"></span>
      <span class="letter">д</span>
      <span class="letter"></span>
      <span class="letter"></span>
    </div>
  </div>

  <!-- Container for final message -->
  <div class="popup-container">
    <div class="popup">
      <h2>
        <h2>Поздравляю, вы победили! 😃</h2>
        <!-- <h2>Вы проиграли. 😕</h2> -->
      </h2>
      <!-- <h3>...имя: Лидия</h3> -->
      <button>Сыграть еще раз</button>
    </div>
  </div>

  <!-- Notification -->
  <div class="notification-container show">
    <p>Вы уже вводили этот символ</p>
  </div>
</template>

<style scoped></style>
