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
            
            <router-link id="primary-btn" class="btn mb-2" style="margin-right: .2rem" :to="{name: 'post', params: {id: post.postId}}">
                View
            </router-link>

            <router-link id="secondary-btn" class="btn mb-2" style="margin-right: .2rem" :to="{name: 'edit-post', params: {id: post.postId}}">
                Edit 
            </router-link>

            <button id="tertiary-btn" class="btn mb-2" style="margin-right: .2rem" @click="handleDelete">Delete</button>

            <span v-if="isWatchlisted">
                <button id="secondary-btn" style="background-color: red;" class="btn mb-2" @click="handleWatchlist">Unwatch</button>
            </span>
            <span v-else>
                <button id="primary-btn" style="background-color: green;" class="btn mb-2"  @click="handleWatchlist">Watch</button>
            </span>

            
            <br/>
            <span>{{post.createdAt}}</span>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import watchlistPostService from '../services/WatchlistPostService';
export default {
  props: ['post'],
  setup(props, {emit}) {

    const id = props.post.postId;
    const toast = useToast();
    const router = useRouter();

    const isWatchlisted = ref(null);

    const handleDelete = () => {
        emit("delete-post", id)
       

    }

    onMounted(async () => {
        const status = await watchlistPostService.getWatchlistedPostByPostId(id);

        if(status != null) {
            console.log("is watchlist")
            isWatchlisted.value = true;
        } else {
            console.log("not watchlist")
            isWatchlisted.value = false;
        }
    })

        const handleWatchlist = async () => {
            // get Single WWatchlisted Post
            await watchlistPostService.getWatchlistedPostByPostId(id).then(res => {
                // If we find a Watchlisted Post, then delete and set isWatchlisted to false 
                watchlistPostService.deleteWatchlistPost(id).then(res => {
                    toast.warning("Post was removed from your watchlist!")      
                    isWatchlisted.value = false;     
                }).catch(err => { // else display error
                    toast.error("There was an error removing post from your watchlist, please try again later.")
                })
            }).catch(err => {
                // If we DON'T find a Watchlisted Post,it will enter the catch block
                // Here we can add this post / create a watchlist for the post and set isWatchlisted to true 
                watchlistPostService.createWatchlist(id).then(res => {
                    toast.success("Post was added to your watchlist!")
                    isWatchlisted.value = true;
                }).catch(err => {
                    toast.error("There was an error adding post to your watchlist, please try again later.")
                })
            })

        }


        return {
            handleDelete, handleWatchlist, id,isWatchlisted
        }
  }
  
};

</script>

<style>

</style>