<template>
    <div class="card post-card">
        <div class="image-body">
            <img src="https://www.willow-car-sales.co.uk/wp-content/uploads/2019/11/placeholder-image-1.jpg" class="card-img-top" alt="Car 1">
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
            <button id="primary-btn" class="btn mb-2" >Watch</button>
            <br/>
            <span>{{post.createdAt}}</span>
        </div>
    </div>
</template>

<script>
export default {
  props: ['post'],
  setup(props) {
         const handleDelete = () => {
            //service.delete(props.branch.id, 'branches')
            alert("deleting.." + props.post.postId)
        }


        return {
            handleDelete
        }
  }
  
};

</script>

<style>

</style>