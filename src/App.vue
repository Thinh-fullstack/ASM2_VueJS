<template>
    <div >
      <!-- Thanh điều hướng -->
      <nav class="navbar navbar-expand-lg navbar-dark rounded-bottom " style="background-color: #1e3a3a;">
        <div class="container-fluid">
          <router-link class="navbar-brand text-primary fw-bolder fs-5 ms-3" to="/"> <i class="fa-solid fa-blog me-2"></i>Blog</router-link>
          
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <router-link class="nav-link" to="/"><i class="fa-solid fa-house-chimney me-2"></i>Home</router-link>
              </li>
              <li  class="nav-item">
                <router-link class="nav-link" to="/login"><i class="fa-solid fa-right-to-bracket me-2"></i>Login</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/post"><i class="fa-solid fa-plus me-2"></i>New Post</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/profile"><i class="fa-solid fa-user me-2"></i>Profile</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- nội dung -->
      <router-view class="shadow-lg rounded my-3 px-2" style="background-color: lightslategrey;"/>
      <div class="text-white text-center py-2 container-lg rounded-top" style="background-color: #1e3a3a;">
      <div class="container">
          <p class="mb-1">
              <i class="fa fa-copyright"></i> Copyright by Thinh(PS41755)
          </p>
      </div>
    </div>
    </div>
    
  </template>
<script setup>


</script>
  
  
  