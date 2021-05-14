import { createRouter, createWebHistory } from 'vue-router'
import Przedmioty from '../views/Przedmioty.vue'
import PanelUzytkownika from '../views/PanelUzytkownika.vue'
import Ustawienia from '../views/Ustawienia.vue'

const routes = [
  {
    path: '/',
    name: 'Przedmioty',
    component: Przedmioty
  },
  {
    path: '/panel',
    name: 'PanelUzytkownika',
    component: PanelUzytkownika,
  },
  {
    path: '/ustawienia',
    name: 'Ustawienia',
    component: Ustawienia,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
