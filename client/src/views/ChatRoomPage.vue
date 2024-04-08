<script setup lang="ts">
import { ref } from 'vue'

interface MessageInfo {
  sender: string
  message: string
}

const name = ref(history.state.name)
const message = ref('')
const messages = ref<MessageInfo[]>([])

const socket = new WebSocket('ws://localhost:8080')

socket.addEventListener('open', () => {
  console.log('Connect to the server')
})

socket.addEventListener('message', (e) => {
  const receivedMessagae: MessageInfo = JSON.parse(e.data)
  messages.value.push(receivedMessagae)
  console.log(messages.value)
})

function sendMessage() {
  const sendingMessage = {
    message: message.value,
    sender: name.value
  }
  const data = JSON.stringify(sendingMessage)
  socket.send(data)
  message.value = ''
}
</script>

<template>
  <div class="mx-auto h-screen w-full max-w-7xl overflow-hidden bg-white">
    <div class="h-[90%] w-full px-4 py-8">
      <h1 class="text-center text-2xl font-bold">Welcome to the chatroom: {{ name }}</h1>
      <div class="whitespace-pre-wrap break-words" v-for="(msg, index) in messages" :key="index">
        <p>{{ msg.sender }} : {{ msg.message }}</p>
      </div>
    </div>
    <form @submit.prevent="sendMessage()" class="flex h-[10%] w-full">
      <textarea v-model="message" class="block w-full resize-none border-2 px-4 py-2" type="text" />
      <button type="submit" class="border-2 bg-gray-100 px-4 py-2">Send</button>
    </form>
  </div>
</template>
