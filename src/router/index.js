import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      title: 'Login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      title: 'Register  ',
      component: RegisterView,
    },
    {
      path: '/restos',
      name: 'restos',
      title: 'Resto',
      component: () => import('../views/RestoView.vue')
    },
    {
      path: '/restos/:id',
      name: 'restos-show',
      title: 'Resto Detail',
      component: () => import('../views/RestoDetailView.vue')
    },
  ]
})

export default router
