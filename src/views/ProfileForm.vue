<template>
  <div class="profile-form">
    <h2>Profile</h2>
    <form @submit.prevent="updateProfile">  
      <div v-if="avatar" class="avatar-preview mt-2 ">
          <img :src="avatar" alt="Avatar Preview" class="img-thumbnail border border-3 rounded" style="max-width: 150px; max-height: 200px;"/>
        </div>
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name" class="form-control" />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" class="form-control" />
      </div>
      <div class="form-group">
        <label for="avatar">Avatar</label>
        <input v-if="isImage" type="file" id="avatar" @change="handleAvatarUpload" class="form-control" />
        <input v-if="!isImage" v-model="avatar" type="text" class="form-control" placeholder="Enter image URL">
        <button class="btn btn-dark mt-2" @click="toggleImage">{{ isImage ? 'Upload' : 'Link' }}</button>
        <!-- Hiển thị ảnh đại diện nếu có -->
        
      </div>
      <button type="submit" class="btn btn-primary mt-3">Update Profile</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '../store';

const { user } = useStore();
const name = ref(user.value?.name || '');
const email = ref(user.value?.email || '');
const avatar = ref(user.value?.avatar || '');  // Avatar: URL hoặc file
const isImage = ref(false);  // Điều chỉnh giữa chế độ upload file và nhập link ảnh

const toggleImage = () => {
  isImage.value = !isImage.value;
};

// Cập nhật thông tin người dùng
const updateProfile = () => {
  user.value.name = name.value;
  user.value.email = email.value;
  user.value.avatar = avatar.value;  // Cập nhật avatar

  // Lưu vào localStorage để bảo toàn thông tin sau khi làm mới trang
  localStorage.setItem('user', JSON.stringify(user.value));
};

// Xử lý việc tải ảnh lên từ máy tính
const handleAvatarUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    avatar.value = URL.createObjectURL(file);  // Tạo URL tạm thời cho ảnh tải lên
  }
};
</script>

<style scoped>
.profile-form {
  max-width: 500px;
  margin: auto;
}
</style>
