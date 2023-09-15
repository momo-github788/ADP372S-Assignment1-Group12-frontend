<template>
  <Navbar />
  <div class="container-fluid mt-5 search-filter-container">
    <div class="row">
      <div class="col-md-8 search-results-container mt-3 mb-4">
        

        <!-- If we get posts from our api, show this -->
        <div v-if="posts">
          <h1 class="fw-bold">Search Results for</h1>
          <div class="row mt-5">
            <div class="col-md-4 mb-2 search-result-container">
              <div class="mb-2" v-for="post in posts" :key="post.postId">
                <PostCard :post="post" />
              </div>
            </div>
          </div>
        </div>

  

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'

import service from '../services/ApiService'

export default {
  // props: ['posts'],
  setup() {
    const posts = ref(null)

    onMounted(async () => {
 
      posts.value = await service.getAll('post', 'search', null);
    })

    return {
      posts
    }
  }
}
</script>

<style>
</style>