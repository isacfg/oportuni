import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/home.page.vue'
import JobDetailPage from '../views/job-detail.page.vue'

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
  ],
})

export default router
