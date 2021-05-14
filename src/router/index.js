import { createRouter, createWebHistory } from 'vue-router'
import Przedmioty from '../views/Przedmioty.vue'
import Notatki from '../views/Notatki.vue'
import Kalkulator from '../views/Kalkulator.vue'

const routes = [
  {
    path: '/',
    name: 'Przedmioty',
    component: Przedmioty
  },
  {
    path: '/notatki',
    name: 'Notatki',
    component: Notatki,
  },
  {
    path: '/kalkulator',
    name: 'Kalkulator',
    component: Kalkulator,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
