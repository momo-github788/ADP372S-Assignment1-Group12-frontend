<template>
    <div class="card post-card">
        <div class="image-body">
            <img :src="post.imageUpload ? 
                'data:image/png;base64,' + post.imageUpload.data  
                : 'https://www.willow-car-sales.co.uk/wp-content/uploads/2019/11/placeholder-image-1.jpg'" 
                class="card-img-top" alt="Car">
        </div>
        <div class="card-body">
            <span>
                <h5 class="card-title">{{post.title}}</h5>
                <h4 class="fw-bold card-title" style="color: rgb(67, 67, 251)">R{{post.price}}</h4>
            </span>
            <p class="card-text">{{post.description}}</p>
            
            <router-link id="primary-btn" class="btn mb-2" style="margin-right: .5rem" :to="{name: 'post', params: {id: post.postId}}">
                View <i class="bi bi-eye"></i>
            </router-link>

            <button id="primary-btn" class="btn mb-2"  @click="handleUnwatch">Unwatch</button>
            <br/>
            <span>Created at {{formattedDate}}</span>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
export default {
  props: ['post'],
  setup(props, {emit}) {

    const id = props.post.postId;

    const handleUnwatch = () => {
        emit("delete-watchlist-post", id)
       
    }

    const formattedDate = computed(() => {
        var date = new Date(props.post.createdAt);
        return date.toString().substring(0, 15);
    });


        return {
            handleUnwatch, formattedDate, id
        }
  }
  
};

</script>

<style>

</style>