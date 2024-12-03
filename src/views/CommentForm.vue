<template>
  <div class="comments-section">
    <h3>Comments</h3>
    <ul class="list-group">
      <li v-for="comment in comments" :key="comment.id" class="list-group-item">
        <strong>{{ comment.user }}</strong>:
        <span>{{ comment.text }}</span>
        <small class="text-muted d-block">Posted at {{ comment.date }}</small>
      </li>
    </ul>

    <form class="mt-3" @submit.prevent="addComment">
      <div class="form-group">
        <textarea v-model="newComment" class="form-control" rows="3" placeholder="Write your comment here..." required></textarea>
      </div>
      <button type="submit" class="btn btn-primary mt-2">Add Comment</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';



const newComment = ref('');

const addComment = () => {
  if (newComment.value.trim()) {
    const currentDate = new Date().toISOString().slice(0, 10); // Lấy ngày hiện tại
    comments.value.push({
      id: comments.value.length + 1,
      user: 'Guest', 
      text: newComment.value,
      date: currentDate,
    });
    newComment.value = ''; // Reset form sau khi gửi
  }
};
</script>

<style scoped>
.comments-section {
  max-width: 600px;
  margin: 20px auto;
}

.list-group-item {
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>