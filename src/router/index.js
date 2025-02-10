import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      redirect: '/main',
      children:[
        {
          path: 'personal',
          name: 'personal',
          component: () => import('../components/content/PersonalItem.vue'),
        },
        {
          path: 'team',
          name: 'team',
          component: () => import('../components/content/TeamItem.vue'),
        },
        {
          path: 'main',
          name: 'main',
          component: () => import('../components/content/MainItem.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    }
  ],
})

export default router
