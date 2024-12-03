<template>
  <div class="login-form">
    <!-- Hiển thị form login nếu chưa đăng nhập -->
    <div v-if="!isLoggedIn">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" class="form-control" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary mt-3">Login</button>
      </form>
    </div>

    <!-- Hiển thị nút logout nếu đã đăng nhập -->
    <div v-if="isLoggedIn">
      <h2>Welcome, {{ user.name }}</h2>
      <button @click="handleLogout" class="btn btn-danger mt-3">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';

const { login, logout, user } = useStore();
const email = ref('');
const password = ref('');
const router = useRouter();

// Kiểm tra xem người dùng đã đăng nhập chưa
const isLoggedIn = computed(() => user.value !== null);
const userDefault = {
  name: 'thinh',
  email: 'thinh@gmail.com',
  password: '123'
}

// Đăng nhập
const handleLogin = () => {
    if(userDefault.email === 'thinh@gmail.com' && userDefault.password === '123'){
      localStorage.setItem('user', JSON.stringify(userDefault))
      alert('Login successful!');
      router.push('/'); 
    } else if (login(email.value, password.value)) {
      alert('Login successful!');
      router.push('/'); 
    } else {
      alert('Login fail');
    }
  
};

// Đăng xuất
const handleLogout = () => {
  logout();
  alert('Logged out successfully!');
  router.push('/login');
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
}

button {
  width: 100%;
  padding: 10px;
}
</style>
