<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const error = ref('')

const router = useRouter()

function joinChat() {
  if (!name.value) {
    error.value = 'Please enter your name before joining chat'
    return
  }
  router.push({
    name: 'ChatRoom',
    state: {
      name: name.value
    }
  })
}
</script>

<template>
  <div class="mx-auto flex h-screen max-w-7xl items-center justify-center">
    <div class="w-full max-w-xl space-y-4 px-4 py-8 shadow-lg">
      <h1 class="text-center text-xl font-bold">Simple Chat App</h1>
      <div v-if="error" class="text-center text-red-500">** {{ error }} **</div>
      <input
        v-model="name"
        class="block w-full border-2 px-4 py-2"
        placeholder="Enter your name before joining chat"
        type="text"
      />
      <button class="ml-auto block bg-gray-100 px-4 py-2 hover:bg-gray-300" @click="joinChat">
        Join chat
      </button>
    </div>
  </div>
</template>
