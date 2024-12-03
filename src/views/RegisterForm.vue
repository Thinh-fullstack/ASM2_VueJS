<template>
  <div class="register-form">
    <h2>Register</h2>
    <!-- Form đăng ký chỉ hiển thị khi người dùng chưa đăng nhập -->
    <form v-if="!isLoggedIn" @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary mt-3">Register</button>
    </form>

    <!-- Thông báo nếu người dùng đã đăng nhập -->
    <div v-if="isLoggedIn">
      <h1>You are already logged in, unable to register</h1>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store';

const { user, register } = useStore();
const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

// Kiểm tra xem người dùng đã đăng nhập chưa
const isLoggedIn = computed(() => !!user.value);

// Hàm xử lý đăng ký
const handleRegister = () => {
  // Kiểm tra nếu người dùng đã đăng nhập thì không cho phép đăng ký
  if (isLoggedIn.value) {
    alert('You are already logged in!');
    return;
  }

  // Gọi phương thức register trong store
  register(name.value, email.value, password.value);
  alert('Registration successful!');
  router.push('/login'); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
};
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: auto;
}
</style>
