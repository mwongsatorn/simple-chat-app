<script setup lang="ts">
import { ref } from 'vue';

const socket = new WebSocket('ws://localhost:8080')

socket.addEventListener('open', () => {
  console.log('Connect to the server')
})

socket.addEventListener("message", (e) => {
  console.log(e)
})

const message = ref("")

function sendMessage() {
  socket.send(message.value)
}
</script>

<template>
  <div class="flex h-screen items-center justify-center gap-x-4">
    <input class="border" v-model="message" type="text">
    <button class="px-4 py-2 bg-slate-200 border-2" @click="sendMessage()">Click to send message</button>
  </div>
</template>
