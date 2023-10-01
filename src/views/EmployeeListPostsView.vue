<!-- All posts an employee created before -->
<template>
   <Navbar/>
  <div class="container-fluid mt-5 search-filter-container">
    <div class="row">
      <div class="col-md-8 search-results-container mt-3 mb-4">

        <div v-if="!loading">
          <h1 class="fw-bold">All of my posts</h1>
        </div>

        <div v-else>
            <h1 class="fw-bold">Loading results..</h1>
            <p>This won't take long</p>
        </div>
   
    
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
</template>

<script>
import { onMounted, ref } from 'vue';
import crudService from '../services/CRUDService';
export default {
 // props: ['posts'],
  setup() {
    const posts = ref(null)
    const loading = ref(true);

    onMounted(() => {
          loading.value = true;

          // delay fetching results by a bit to show loading state
          setTimeout(async () => {    
              posts.value = await crudService.getAll('post', 'search', null);
              loading.value = false;
              console.log("posts")
              console.log(posts.value)
          }, 750)
      })

    return {
      posts, loading
    }
  }
}
</script>

<style>

</style>