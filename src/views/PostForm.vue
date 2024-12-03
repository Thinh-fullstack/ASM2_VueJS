<template>
  <div class="post-form">
    <h2>New Post</h2>
    <div>
        <img class="rounded mx-auto" style="max-width: 500px;" v-if="image" :src="image" alt="" >
      </div>
    <form @submit.prevent="handleSubmit">
      
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" class="form-control" required />
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea id="content" v-model="content" class="form-control" style="height: 200px;" required></textarea>
      </div>
      <div class="form-group">
        <label for="image">Image (optional)</label>
        
        <div class="form-control d-flex justify-content-center">
        <input v-if="isImage" type="file" id="image" @change="handleImageUpload" class="form-control" />
        <input v-if="!isImage" class="form-control" v-model="image" type="text">
        <button class="btn btn-dark ms-2" @click="toggleImage">{{ isImage ? 'Upload' : 'Link' }}</button>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mt-3">Post</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';

const { addPost } = useStore();
const title = ref('');
const content = ref('');
const image = ref('');
const router = useRouter();
const isImage = ref(false)

const toggleImage = () => {
  isImage.value = !isImage.value
}

// Hàm xử lý submit khi người dùng gửi form
const handleSubmit = () => {
  // Kiểm tra nếu người dùng dán đường link ảnh vào nội dung, sử dụng đường link đó làm ảnh
  const imageUrl = content.value.match(/https?:\/\/[^\s]+(\.(?:jpg|jpeg|png|gif))/);
  if (imageUrl) {
    image.value = imageUrl[0];  // Dùng đường link ảnh nếu có trong nội dung
  }

  // Gọi phương thức thêm bài viết từ store
  addPost(title.value, content.value, image.value);

  alert('Post created!');
  router.push('/');  // Chuyển về trang chủ sau khi đăng bài
};


// Hàm xử lý khi người dùng chọn tệp hình ảnh
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      image.value = reader.result;  // Đặt giá trị ảnh là URL tạm thời của file
      imagePreview.value = reader.result; // Hiển thị ảnh xem trước
    };
    reader.readAsDataURL(file);
  }
};
</script>



<style scoped>
.post-form {
  
  margin: auto;
}
</style>
