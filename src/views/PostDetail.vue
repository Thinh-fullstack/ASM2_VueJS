<template>
  <div>
    <!-- Hiển thị tiêu đề và nội dung bài viết -->
    <div class="d-flex flex-column">
      <h1 class="m-auto mb-3" style="word-break: break-word;">{{ post?.title }}</h1>
      <img class="rounded mx-auto d-block" style="max-width: 900px; max-height: 500px;" :src="post?.image" alt="">
      <h5 class="mt-4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ post?.content }}</h5>
    </div>
    <hr>
    <!-- Hiển thị danh sách bình luận -->
    <h3>Comments</h3>
    <ul>
      <li v-for="comment in post?.comments" :key="comment.date">
        <strong>{{ comment.user }}:</strong> {{ comment.text }}
        <br />
        <small>{{ new Date(comment.date).toLocaleString() }}</small>
      </li>
    </ul>

    <!-- Form để thêm bình luận nếu người dùng đã đăng nhập -->

    <div v-if="user">
      <textarea v-model="newComment" placeholder="Write your comment..."></textarea>

    </div>
    <div class="row">
      <div class="col-2">
        <button class="btn btn-primary" @click="submitComment">Submit</button>
      </div>
      <div class="col-8"></div>
      <div v-if="user" class="col-2 ">
        <button class="btn btn-danger float-end" @click="deletePost">Delete post</button>
      </div>
    </div>
    <!-- Nếu người dùng chưa đăng nhập, hiển thị thông báo yêu cầu đăng nhập -->
    <div v-if="!user">
      <p>You need to <router-link to="/login">log in</router-link> to comment.</p>
    </div>

  </div>

</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from '../store';
import { useRoute, useRouter } from 'vue-router';

const { posts, addComment, user, removePost } = useStore();
const route = useRoute();
const router = useRouter();
// Lấy bài viết dựa vào ID từ route
const post = computed(() => posts.value.find(p => p.id === +route.params.id));

// Hàm xử lý xóa bài viết
const deletePost = () => {
  const isConfirmed = confirm("Are you sure you want to delete this post?");

  if (isConfirmed) {
    removePost(post.value.id); // Gọi removePost từ store để xóa bài viết
    alert('Post deleted!');
    router.push('/')
  } else {
    alert('Post not deleted.');
  }
};



// Dữ liệu bình luận
const newComment = ref('');

// Hàm gửi bình luận
const submitComment = () => {
  if (!user.value) {
    alert('You need to be logged in to comment!');
    router.push('/login'); // Chuyển hướng đến trang đăng nhập
    return;
  }

  // Thêm bình luận với tên người dùng đã đăng nhập
  addComment(post.value.id, {
    user: user.value.name, // Lấy tên từ tài khoản đã đăng nhập
    text: newComment.value,
    date: new Date().toISOString(),
  });


  newComment.value = ''; // Xóa dữ liệu nhập sau khi gửi
};
</script>



<style scoped>
textarea {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 10px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

strong {
  color: #007bff;
}
</style>
