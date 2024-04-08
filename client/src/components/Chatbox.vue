<script setup lang="ts">
const props = defineProps<{
  sender: string
  message: string
}>()
</script>

<template>
  <div class="w-fit">
    <div class="font-bold">{{ props.sender }}</div>
    <div class="whitespace-pre-wrap break-words rounded-md bg-blue-500 px-4 py-2 text-white">
      {{ props.message }}
    </div>
  </div>
</template>
