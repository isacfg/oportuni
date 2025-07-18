import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/home.page.vue'
import JobDetailPage from '../views/job-detail.page.vue'
import AuthCallbackPage from '../views/auth-callback.page.vue'
import CreateJobPage from '../views/create-job.page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/vagas/:id',
      name: 'job-detail',
      component: JobDetailPage,
    },
    {
      path: '/cadastrar-vaga',
      name: 'create-job',
      component: CreateJobPage,
    },
    {
      path: '/auth/callback',
      name: 'auth-callback',
      component: AuthCallbackPage,
    },
  ],
})

export default router
