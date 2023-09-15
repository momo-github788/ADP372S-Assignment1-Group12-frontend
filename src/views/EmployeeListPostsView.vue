<!-- All posts an employee created before -->
<template>
   <Navbar/>
  <div class="container-fluid mt-5 search-filter-container">
    <div class="row">
      <div class="col-md-8 search-results-container mt-3 mb-4">
   
          <h1 class="fw-bold">All of my posts</h1>
          <div class="row mt-5">
            <div class="col-md-4 mb-2 search-result-container">
              <div class="mb-2" v-for="post in posts" :key="post.postId">
                <PostCardEmployee :post="post" />
              </div>
            </div>
          </div>
     

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import service from '../services/ApiService';
export default {
 // props: ['posts'],
  setup() {
    const posts = ref(null)

    onMounted(async () => {
      posts.value = await service.getAll(null, 'posts');
    })

    return {
      posts
    }
  }
}
</script>

<style>

</style>