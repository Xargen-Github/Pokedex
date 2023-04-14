import { createRouter, createWebHistory } from 'vue-router'
import SearchViewVue from '@/views/SearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: SearchViewVue
    },
    {
      path: '/details/:id',
      name: 'details',
      component: () => import('../views/PokemonDetailView.vue')
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: () => import('../views/FavouritesView.vue')
    }
  ]
})

export default router
