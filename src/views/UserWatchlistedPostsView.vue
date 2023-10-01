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
                <PostCardWatchlist :post="post" @delete-watchlist-post="handleUnwatch(post.postId)"/>
              </div>
            </div>
          </div>
     

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted,watch, ref } from 'vue'
import watchlistPostService from '../services/WatchlistPostService'
import { useToast } from "vue-toastification";

export default {
    setup() {
        const watchlistedPosts = ref(null);
        const toast = useToast();
        const loading = ref(true);

        const handleUnwatch = (id) => {
          console.log("emitted " + id)

          watchlistPostService.deleteWatchlistPost(id)
              .then(res => {
                  if(res) {
                    toast.success("Post was removed from your watchlist!")

                    watchlistedPosts.value = watchlistedPosts.value.filter(w => w.postId !== id)                      
                  }
                  console.log(res)
              }).catch(err => {
                  if(err) {
                      console.log(err)
                      toast.error("There was an error removing post from your watchlist, please try again later.")
                  }
              })

        }


        onMounted(async () => {
          console.log("mouning")
            loading.value = false;

            watchlistedPosts.value = await watchlistPostService.getAllWatchlistedPosts();
          
            console.log("watchlistedPosts")
            console.log(watchlistedPosts.value)
        })

        return {
            watchlistedPosts, loading, handleUnwatch
        }
        
    }
}
</script>

<style>

</style>