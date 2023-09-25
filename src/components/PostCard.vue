<template>
    <div class="card post-card">
        <div class="image-body">
            <img :src="post.imageUpload ? 
                'data:image/png;base64,' + post.imageUpload.data  
                : 'https://www.willow-car-sales.co.uk/wp-content/uploads/2019/11/placeholder-image-1.jpg'" 
                class="card-img-top" alt="Car">
        </div>
        <div class="card-body">
            <h5 class="card-title">{{post.title}}</h5>
            <p class="card-text">{{post.description}}</p>
            
            <router-link id="primary-btn" class="btn mb-2" style="margin-right: .5rem" :to="{name: 'post', params: {id: post.postId}}">
                View <i class="bi bi-eye"></i>
            </router-link>

            <router-link id="secondary-btn" class="btn mb-2" style="margin-right: .5rem" :to="{name: 'edit-post', params: {id: post.postId}}">
                Edit <i class="bi bi-file-earmark-text"></i>
            </router-link>

            <button id="tertiary-btn" class="btn mb-2" style="margin-right: .5rem" @click="handleDelete">Delete <i class="bi bi-trash"></i></button>

            <button id="primary-btn" class="btn mb-2"  @click="handleWatchlist">Watch</button>
            <br/>
            <span>{{post.createdAt}}</span>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import service from '../services/ApiService';
export default {
  props: ['post'],
  setup(props, {emit}) {

    const id = props.post.postId;
    const toast = useToast();
    const router = useRouter();




    const handleDelete = () => {
        emit("delete-post", id)

    }

        const handleWatchlist = () => {
            console.log("id " + id)
            service.createWatchlist(id)
                .then(res => {
                    toast.success("Post was added to your watchlist!")
                    router.push('/');
                }).catch(err => {
                    console.log(err)
                    toast.error("There was an error adding post to your watchlist, please try again later.")
                })

        }


        return {
            handleDelete, handleWatchlist
        }
  }
  
};

</script>

<style>

</style>