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
                View <i class="bi bi-eye"></i>
            </router-link>

            <router-link id="secondary-btn" class="btn mb-2" style="margin-right: .2rem" :to="{name: 'edit-post', params: {id: post.postId}}">
                Edit <i class="bi bi-file-earmark-text"></i>
            </router-link>

            <button id="tertiary-btn" class="btn mb-2" style="margin-right: .2rem" @click="handleDelete">Delete <i class="bi bi-trash"></i></button>

            <div v-if="isWatchlisted">
                <button id="secondary-btn" style="background-color: red;" class="btn mb-2"  @click="handleWatchlist">Unwatch</button>
            </div>
            <div v-else>
                <button id="primary-btn" style="background-color: green;" class="btn mb-2"  @click="handleWatchlist">Watch</button>
            </div>

            
            <br/>
            <span>{{post.createdAt}}</span>
        </div>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import service from '../services/ApiService';
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
        const status = await service.getWatchlistedPostByPostId(id);

        if(status != null) {
            console.log("is watchlist")
            isWatchlisted.value = true;
        } else {
            console.log("not watchlist")
            isWatchlisted.value = false;
        }
    })

        const handleWatchlist = async () => {
            console.log("id " + id)

            await service.getWatchlistedPostByPostId(id)
                .then(r => {
                    console.log("suc")
                    console.log(r)
                    console.log("must delete wtchlst")
                    service.deleteWatchlistPost(id)
                        .then(res => {
                            if(res) {
                                toast.success("Post was removed from your watchlist!")                
                            }
                            console.log(res)
                        }).catch(err => {
                            if(err) {
                                console.log(err)
                                toast.error("There was an error removing post from your watchlist, please try again later.")
                            }
                        })
                }).catch(e => {
                    console.log("er")
                    console.log(e)
                    console.log("must addto wtachlist")
                    service.createWatchlist(id)
                    .then(res => {
                        toast.success("Post was added to your watchlist!")
                        console.log(res)
                        
                        //router.push('/');
                    }).catch(err => {
                        console.log(err)
                        toast.error("There was an error adding post to your watchlist, please try again later.")
                    })
                })
        
            // if(status!=null) {

            // } else {

            // }

        
    

        }


        return {
            handleDelete, handleWatchlist, id,isWatchlisted
        }
  }
  
};

</script>

<style>

</style>