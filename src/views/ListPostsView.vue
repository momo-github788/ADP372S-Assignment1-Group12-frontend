<template>
  <Navbar />
  <div class="container-fluid mt-5 search-filter-container">
    <div class="row">
      <div class="col-md-8 search-results-container mt-3 mb-4">
        

        <div v-if="!loading">
          <h1 class="fw-bold">Search Results</h1>
        </div>

        <div v-else>
            <h1 class="fw-bold">Loading results..</h1>
            <p>This won't take long</p>
        </div>
   
        <!-- If we get posts from our api, show this -->
        <div v-if="!loading && posts">
          
          <div class="row mt-5">
            <div class="col-md-4 mb-2 search-result-container">
              <div class="mb-2" v-for="post in posts" :key="post.postId">
                <PostCard :post="post" @delete-post="handleDelete(post.postId)" />
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
import { useToast } from "vue-toastification";
import crudService from '../services/CRUDService'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const posts = ref(null)
    const route = useRoute();
    const loading = ref(true);
    const toast = useToast();

    const handleDelete = (id) => {
      console.log("id " + id)
      crudService.delete('post', id)
            .then(res => {
              if(res) {
                posts.value = posts.value.filter(p => p.postId !== id)
                toast.success("Post deleted successfully!")
              }

            }).catch(err => {
                toast.error("There was an error deleting, please try again later.")
            })
    }

  
    onMounted(async () => {
      loading.value = true;
      const title = route.query.title;

      if(title && title != null) {
        posts.value = await crudService.getAll('post', 'search', title);
        loading.value = false;
      } else {
        posts.value = await crudService.getAll('post', 'search', null);
        loading.value = false;
      }
      console.log("posts")
      console.log(posts.value)
      


    })
    

    return {
      posts, route, loading, handleDelete
    }
  }
}
</script>

<style>
</style>