import { createRouter, createWebHistory } from 'vue-router';
// import AppLayout from '../components/layout/AppLayout.vue';

const router = createRouter({
  history: createWebHistory(), // Ensure no `#` in URLs
  routes: [
    {
      path: '/',
      name: 'app',
      component: () => import('../App.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutPage.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.vue')
    },

  ]
});

export default router;
