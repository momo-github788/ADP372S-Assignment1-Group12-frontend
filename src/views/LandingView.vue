<template>
    <Navbar/>
  <section class="hero-section">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3">
                <h1 class="hero-title">Find your dream vehicle</h1>
                <p class="hero-description">We offer a variety of pre-loved vehicles at affordable prices</p>
                <form  @submit.prevent="handleSubmit" class="d-flex search-form">
                    <input class="form-control me-2" type="search" name="title" v-model="title" placeholder="Search" aria-label="Search">
            
<!-- 
                    <router-link :to="{name: 'posts', params: {title: title}}"> -->
                        <button class="btn">Search</button>
                    <!-- </router-link> -->
                 
                 
                  
                </form>
            </div>
        </div>
        
    </div>

       
</section>


<div class="container mt-5" id="landing-container">
    
<h1 class="fw-bold">Latest Posts</h1>
    <div class="row mt-5">
        <div class="col-md-4 mb-2 search-result-container">
            <div class="mb-2" v-for="post in posts" :key="post.postId">
            <PostCard :post="post"  @delete-post="handleDelete(post.postId)"/>
            </div>
        </div>
    </div>
</div>  

</template>

<script>
import { onMounted, ref} from 'vue'
import { useRouter } from 'vue-router';
import crudService from '../services/CRUDService';
import PostCard from '../components/PostCard.vue';
import { useToast } from 'vue-toastification';

export default {
    setup() {
        const title = ref('');
        const router = useRouter();
        const posts = ref(null);
        const handleSubmit = () => {
            router.push({ path: 'posts', query: { title: title.value } });
        };
        onMounted(async () => {
            posts.value = await crudService.getAll('post', 'search', null);
            console.log("posts")
            console.log(posts.value)
        }); 

        const handleDelete = (id) => {
        console.log('in handle delete ' + id)
        crudService.delete('post', id)
                .then(res => {
                    useToast().success("Post deleted successfully!")
                    posts.value = posts.value.filter(p => p.postId !== id)
            
                }).catch(err => {
                    useToast().error("There was an error deleting, please try again later.")
                })
        }
        return {
            title, handleSubmit, posts, handleDelete
        };
    },
    components: { PostCard }
}
</script>

<style scoped>
.hero-section {
    padding: 90px 0;
    text-align: center;
    background: linear-gradient(135deg, #3498db, #232aea);
}


.hero-section .search-form {
    height: 55px;

}

.hero-section .search-form input{
    font-size: 1.15rem;
}

.hero-section .search-form button {
    border:none;
    width: 190px;
    background-color: #0e1628;
    font-weight: bold;
    font-size: 1.1rem;
    color: #fff;
    height: 100%;
}

.hero-section .hero-title {
    font-size: 56px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #fff;
}

.hero-section .hero-description {
    font-size: 24px;
    color: #d2d2d2;
    margin-bottom: 30px;
}

</style>