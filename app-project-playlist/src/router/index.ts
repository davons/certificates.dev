import { createRouter, createWebHistory } from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import SignupView from '@/views/auth/SignupView.vue'
import useUser from '@/composables/useUser'
import CreatePlayListView from '@/views/playlists/CreatePlayListView.vue'
import PlayListShowView from '@/views/playlists/PlayListShowView.vue'
import UserPlaylistsView from '@/views/playlists/UserPlaylistsView.vue'

const requireAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { currentUser: user } = useUser()
  if (user.value) {
    next()
  }
  next({ name: 'Login' })
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      beforeEnter: requireAuth,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignupView,
    },
    {
      path: '/add',
      name: 'CreatePlayList',
      component: CreatePlayListView,
      beforeEnter: requireAuth,
    },
    {
      path: '/show/:id',
      name: 'PlaylistShow',
      component: PlayListShowView,
      props: true,
      beforeEnter: requireAuth,
    },
    {
      path: '/playlists/user',
      name: 'UserPlaylists',
      component: UserPlaylistsView,
      beforeEnter: requireAuth,
    },
  ],
})

export default router
