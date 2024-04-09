<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { throttle, debounce } from '@/helpers/execute'
import Chatbox from '@/components/Chatbox.vue'

type MessageInfo = MessageSendingType | MessageTypeingType

type MessageSendingType = {
  type: 'Sending'
  sender: string
  message: string
}

type MessageTypeingType = {
  type: 'Typing'
}

const name = ref(history.state.name)
const isTyping = ref(false)
const message = ref('')
const messages = ref<MessageSendingType[]>([])
const chatWindow = ref<HTMLElement | null>(null)

const socket = new WebSocket('ws://localhost:8080')

socket.addEventListener('open', () => {
  console.log('Connect to the server')
})

socket.addEventListener('message', async (e) => {
  const receivedMessagae: MessageInfo = JSON.parse(e.data)
  switch (receivedMessagae.type) {
    case 'Sending': {
      isTyping.value = false
      messages.value.push(receivedMessagae)
      await nextTick()
      chatWindow.value!.scrollTop = chatWindow.value!.scrollHeight
      break
    }
    case 'Typing': {
      isTyping.value = true
      await nextTick()
      chatWindow.value!.scrollTop = chatWindow.value!.scrollHeight
      stopTyping()
      break
    }
  }
})

function sendMessage() {
  if (!message.value) return
  const sendingMessage: MessageInfo = {
    type: 'Sending',
    message: message.value,
    sender: name.value
  }
  const data = JSON.stringify(sendingMessage)
  socket.send(data)
  message.value = ''
}

const sendTypingSignal = throttle(() => {
  const signal = {
    type: 'Typing'
  } as const
  const data = JSON.stringify(signal)
  socket.send(data)
}, 1000)

const stopTyping = debounce(() => {
  isTyping.value = false
}, 2000)
</script>

<template>
  <div class="mx-auto w-full max-w-7xl bg-white">
    <div class="flex h-[calc(100vh-56px)] min-h-[480px] w-full flex-col overflow-hidden py-8">
      <h1 class="text-center text-2xl font-bold">Welcome to the chatroom: {{ name }}</h1>
      <div ref="chatWindow" class="mt-8 flex grow flex-col overflow-y-auto px-4 py-8">
        <div class="mt-auto w-full space-y-4">
          <Chatbox
            :class="[name === msg.sender ? 'ml-auto' : null]"
            :sender="msg.sender"
            :message="msg.message"
            v-for="(msg, index) in messages"
            :key="index"
          >
          </Chatbox>
          <div v-if="isTyping">Someone is typing</div>
        </div>
      </div>
    </div>
    <form @submit.prevent="sendMessage()" class="flex h-[56px] w-full">
      <textarea
        autofocus
        @keydown="sendTypingSignal"
        @keydown.enter.exact.prevent="sendMessage()"
        v-model="message"
        class="block w-full resize-none border-2 px-4 py-2"
        type="text"
      />
      <button type="submit" class="border-2 bg-gray-100 px-4 py-2">Send</button>
    </form>
  </div>
</template>
