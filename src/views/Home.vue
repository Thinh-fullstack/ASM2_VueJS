<template>
    <div class="">
        
        <div v-if="posts.length === 0" class="text-center">
            <p>No posts available. Be the first to write one!</p>
        </div>
        <div v-else class="post-list">
            <div class="row">
                <div class="container-fluid col-lg-3 col-md-6 col-sm-12 d-flex justify-content-between my-4" v-for="post in posts" :key="post.id">
                    <div class="card h-100" >
                        <img :src="post.image" alt="Post image" class="card-img-top m-auto" style="width: 300px; height: 180px;" />
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title" style="max-width: 100%; overflow: hidden;">{{ post.title }}</h5>
                            <p class="card-text text-truncate" style="max-width: 100%; overflow: hidden;">{{ post.content }}</p>
                            <button class="btn btn-primary mt-auto" @click="viewPost(post.id)">Read More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';

const { posts } = useStore();
const router = useRouter();

const viewPost = (id) => {
  router.push(`/post/${id}`);
};
</script>


<style scoped>


.post {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
}

.post h3 {
    margin-bottom: 10px;
}
</style>