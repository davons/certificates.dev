import { createRouter, createWebHistory} from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import WelcomeView from '@/views/WelcomeView.vue'
import ChatroomView from '@/views/ChatroomView.vue'
import useUser  from '@/composables/useUser'

//auth guard
const requireAuthenticator = (
  to: RouteLocationNormalized, 
  from: RouteLocationNormalized, 
  next: NavigationGuardNext
) => {
  const { currentUser } = useUser()

    if (!currentUser.value) {
      next({ name: 'Welcome' })
    } else {
      next()
    }
}

const requireNoAuthenticator = (
  to: RouteLocationNormalized, 
  from: RouteLocationNormalized, 
  next: NavigationGuardNext
) => {
  const { currentUser } = useUser()
  if (currentUser.value) {
    next({ name: 'Chatroom'})
  }
  next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: WelcomeView,
      beforeEnter: requireNoAuthenticator
    },
    {
      path: '/chatroom',
      name: 'Chatroom',
      component: ChatroomView,
      beforeEnter: requireAuthenticator
    }
  ],
})

export default router
