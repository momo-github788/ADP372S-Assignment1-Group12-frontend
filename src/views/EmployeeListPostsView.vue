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

        <div v-if="isAdmin">
            <router-link to="create-post">
              <button class="btn btn-primary">Create a Post</button>
            </router-link>
           </div>


   
    
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
</template>

<script>
import { onMounted, ref } from 'vue';
import postService from '../services/PostService';
import crudService from '../services/CRUDService';
import { useToast } from 'vue-toastification';
import { store } from '../store/Store';
export default {
    // props: ['posts'],
    setup() {
        const posts = ref(null);
        const loading = ref(true);
        const isUser = ref(null);
        const isAdmin = ref(null);


        const handleDelete = (id) => {
          console.log("id " + id)
          crudService.delete('post', id)
                .then(res => {
                  if(res) {
                    useToast().success("Post deleted successfully!")
                    posts.value = posts.value.filter(p => p.postId !== id)
                  }
                  console.log(res)
                }).catch(err => {
                  useToast().error("There was an error deleting, please try again later.")
                })
        }

        onMounted(async () => {
            isAdmin.value = store.isAdmin;
            isUser.value = store.isUser;
            posts.value = await postService.getAllEmployeePosts();
            loading.value = false;
            console.log("all emp posts");
            console.log(posts.value);
        });



        return {
            posts, loading, handleDelete, isUser, isAdmin
        };
    },
    components: {  }
}
</script>

<style>

</style>