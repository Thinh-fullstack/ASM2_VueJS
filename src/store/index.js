// src/store/index.js
import { ref } from 'vue';

export const useStore = () => {

  const user = ref(
    JSON.parse(localStorage.getItem('user')) || null
  );




  const posts = ref(JSON.parse(localStorage.getItem('posts')) || []);


  const login = (email, password) => {
    console.log(`Email: ${email}, Password: ${password}`);
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      console.log('User found:', storedUser);
      user.value = { name: storedUser.name, email: storedUser.email };
      return true;
    }

    return false;
  };



  const logout = () => {
    user.value = null;
    localStorage.removeItem('user')
  };



  const register = (name, email, password) => {
    user.value = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user.value));
  };

  const addPost = (title, content, image) => {
    const newPost = {
      id: posts.value.length + 1,
      title,
      content,
      image,
      comments: [],
    };
    posts.value.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts.value));
  };

  const addComment = (postId, comment) => {
    // Tìm bài viết dựa trên ID
    const post = posts.value.find(p => p.id === postId);
    
    if (post) {
      // Thêm bình luận vào mảng comments của bài viết
      post.comments.push(comment);
      
      // Cập nhật lại dữ liệu posts vào localStorage
      localStorage.setItem('posts', JSON.stringify(posts.value));
    }
  };
  
  

// Hàm xóa bài viết (cập nhật localStorage sau khi xóa)
const removePost = (id) => {
  const index = posts.value.findIndex(post => post.id === id);
  if (index !== -1) {
    posts.value.splice(index, 1); // Xóa bài viết khỏi mảng
    // Cập nhật lại localStorage sau khi xóa
    localStorage.setItem('posts', JSON.stringify(posts.value)); 
  }
};



  return { user, posts, login, logout, register, addPost, addComment, removePost };
};
