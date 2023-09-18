<template>
   <Navbar/>
  <div class="container-fluid mt-5 search-filter-container">
    <div class="row">
      <div class="col-md-8 search-results-container mt-3 mb-4">

        <div v-if="!loading">
          <h1 class="fw-bold">My Watchlisted posts</h1>
        </div>

        <div v-else>
            <h1 class="fw-bold">Loading results..</h1>
            <p>This won't take long</p>
        </div>

          <div class="row mt-5">
            <div class="col-md-4 mb-2 search-result-container">
              <div class="mb-2" v-for="post in watchlistedPosts" :key="post.postId">
                <PostCardWatchlist :post="post" />
              </div>
            </div>
          </div>
     

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import service from '../services/ApiService';

export default {
    setup() {
        const watchlistedPosts = ref(null);
        const route = useRoute();
        const loading = ref(true);


        onMounted(async () => {
          console.log("mouning")
            loading.value = false;

            watchlistedPosts.value = await service.getAllWatchlistedPosts();
          
            console.log("watchlistedPosts")
            console.log(watchlistedPosts.value)
        })

        return {
            watchlistedPosts, loading
        }
        
    }
}
</script>

<style>

</style>