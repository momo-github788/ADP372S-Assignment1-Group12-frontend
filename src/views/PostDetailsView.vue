<template>
  <Navbar />
  <div class="container-fluid mt-5">
    <div v-if="post">
      <div class="row">
        <div class="col-md-6">
          <img
            :src="
              post.imageUpload
                ? 'data:image/png;base64,' + post.imageUpload.data
                : 'https://www.willow-car-sales.co.uk/wp-content/uploads/2019/11/placeholder-image-1.jpg'"
            class="img-fluid"
            alt="Car"
          />
        </div>
        <div class="col-md-6">
          <h1 class="fw-bold">{{ post.title }}</h1>
          <p class="text-muted">Created on {{ post.createdAt }}</p>
          <p class="lead fw-bold">R {{ post.price }}</p>
          <p>{{ post.description }}</p>

          <div class="row">
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="fw-bold">Vehicle Details</h5>
                  <span>Make: {{ post.vehicle.make }}</span><br />
                  <span>Model: {{ post.vehicle.model }}</span><br />
                  <span>Year: {{ post.vehicle.year }}</span><br />
                  <span>Colour: {{ post.vehicle.colour }}</span><br />
                  <span>Fuel Type: {{ post.vehicle.fuelType }}</span><br />
                  <span>Condition: {{ post.vehicle.condition }}</span><br />
                  <span>Body Type: {{ post.vehicle.bodyType }}</span><br />
                  <span>Mileage: {{ post.vehicle.mileage }}</span><br />
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="fw-bold">Branch Details</h5>
                  <span>Name: {{ post.branch.branchName }}</span><br />
                  <span>Street Details: {{ post.branch.location.streetNumber }} {{ post.branch.streetName}}</span><br />
                  <span>Postal Code: {{ post.branch.location.postalCode }}</span><br />
                  <span>City: {{ post.branch.location.city }}</span><br />
                  <span>Province: {{ post.branch.location.province }}</span><br />

                </div>
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

import crudService from '../services/CRUDService'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const post = ref(null)

    const route = useRoute()

    onMounted(async () => {
      const id = route.params.id
      await crudService.getById('post', id)
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

<style></style>
