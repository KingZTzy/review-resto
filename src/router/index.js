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
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      title: 'Register  ',
      component: RegisterView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/restos',
      name: 'restos',
      title: 'Resto',
      component: () => import('../views/RestoView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/restos/:id',
      name: 'restos-show',
      title: 'Resto Detail',
      component: () => import('../views/RestoDetailView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/restos/create',
      name: 'create-restos',
      title: 'Create Resto',
      component: () => import('../views/CreateRestoView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/restos/edit/:id',
      name: 'edit-restos',
      title: 'Edit Resto',
      component: () => import('../views/EditRestoView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      title: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to,from) => {
  if (to.meta.requiresAuth && !localStorage.getItem('access_token')) {
    return { name: 'login' }
  }
  if (to.meta.requiresAuth === false && localStorage.getItem('access_token')) {
    return { name: 'restos' }
  }
});

export default router
