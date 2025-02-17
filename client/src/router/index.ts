import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: HomePage
    },
    {
      name: 'ChatRoom',
      path: '/chatroom',
      component: () => import('@/views/ChatRoomPage.vue')
    }
  ]
})

export default router
