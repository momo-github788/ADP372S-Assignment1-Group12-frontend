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

            <button id="primary-btn" class="btn mb-2"  @click="handleWatchlist">Unwatch</button>
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
  setup(props) {

    const id = props.post.postId;
    const toast = useToast();
    const router = useRouter();

    const handleWatchlist = () => {
        console.log("id " + id)
        service.createWatchlist(id)
            .then(res => {
                if(res) {
                    toast.success("Post was added to your watchlist!")
                    router.push('/')
                }
                console.log(res)
            }).catch(err => {
                if(err) {
                    console.log(err)
                    toast.error("There was an error adding post to your watchlist, please try again later.")
                }
            })

    }


        return {
            handleWatchlist
        }
  }
  
};

</script>

<style>

</style>