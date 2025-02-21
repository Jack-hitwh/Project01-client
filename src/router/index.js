import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import {tokenVerify} from "@/api/users/index.js";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        redirect: '/main',
        children: [
            {
                path: 'personal',
                name: 'personal',
                meta: {
                    requiresAuth: true
                },
                component: () => import('../components/content/PersonalItem.vue'),
            },
            {
                path: 'team',
                name: 'team',
                component: () => import('../components/content/TeamItem.vue'),
                meta: {
                    requiresAuth: true
                },
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
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('authorization');
    // 如果路由需要验证且没有 Token，跳转到登录页
    if (to.meta.requiresAuth && !token) {
        next('/login');
        return;
    }
    // 如果有 Token 且路由需要验证，验证 Token 的有效性
    if (token && to.meta.requiresAuth) {
        try {
            const response = await tokenVerify({token});
            if (response.status === 200) {
                const {code} = response.data
                if (code === 50007 || code === 50008) {
                    // Token 无效或过期，跳转到登录页
                    next('/login')
                    return
                }
            }
        } catch (error) {
            console.error('Token 验证失败', error)
            next('/login') // 验证失败，跳转到登录页
            return
        }
    }
    next()
})

export default router
