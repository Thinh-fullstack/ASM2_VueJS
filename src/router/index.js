// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import LoginForm from '@/views/LoginForm.vue';
import RegisterForm from '@/views/RegisterForm.vue';
import ProfileForm from '@/views/ProfileForm.vue';
import PostForm from '@/views/PostForm.vue';
import PostDetail from '@/views/PostDetail.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: LoginForm },
  { path: '/register', name: 'Register', component: RegisterForm },
  { path: '/profile', name: 'Profile', component: ProfileForm, meta: { requiresAuth: true } },
  { path: '/post', name: 'NewPost', component: PostForm, meta: { requiresAuth: true } },
  { path: '/post/:id', name: 'PostDetail', component: PostDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('user'); 
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login'); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
  } else {
    next(); // Cho phép truy cập
  }
});

export default router;
