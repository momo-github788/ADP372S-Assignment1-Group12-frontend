<template>
  <Navbar />
  <div class="container mt-5">

    <div v-if="post">
      <div class="row">

        <div class="col-md-6">
          <img src="https://via.placeholder.com/400" alt="Product Image" class="img-fluid" />
        </div>
        <div class="col-md-6">
          <h1 class="fw-bold">{{ post.title }}</h1>
          <p class="text-muted">Created on {{post.createdAt}}</p>
          <p class="lead">$49.99</p>
          <p>{{post.description}}</p>
          <h5 class="fw-bold">Details</h5>
          <span>Mileage: 1999</span><br/>
          <span>Mileage: 1999</span><br/>
          <span>Mileage: 1999</span><br/>
          <span>Mileage: 1999</span><br/>
          <span>Mileage: 1999</span><br/>
          <span>Mileage: 1999</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'

import service from '../services/ApiService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const post = ref(null)

    const route = useRoute()

    onMounted(async () => {
      const id = route.params.id
      await service
        .getById('post', id)
        .then((res) => {
          console.log(res)
          post.value = res
        })
        .catch((err) => {
          console.log(err)
        })
    })

    return {
      post
    }
  }
}
</script>

<style>
</style>