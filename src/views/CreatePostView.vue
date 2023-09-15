<template>
    <Navbar />
  <div class="create-branch-container">

    <h1 class="fw-bold">Create a Post</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Post Information -->
      <div class="mb-3">
        <label for="title">Title:</label>
        <input type="text" class="form-control" id="title" name="title" v-model="title" required />
      </div>

      <div class="mb-3">
        <label for="description">Description:</label>
        <textarea class="form-control" id="description" name="description" v-model="description" required></textarea>
      </div>

      <div class="mb-3">
        <span style="color: red; font-size:.75rem; float: right" v-if="errors.price">{{errors.price}}</span>
        <label for="price">Price:</label>
        <input type="number" class="form-control" id="price" name="price" v-model="price" required />
      </div>

      <!-- Vehicle Information -->
      <div class="mb-3">
        <label for="make">Vehicle Make:</label>
        <input type="text" class="form-control" id="make" name="make" v-model="vehicle.make" required />
      </div>

      <div class="mb-3">
        <label for="model">Vehicle Model:</label>
        <input type="text" class="form-control" id="model" name="model" v-model="vehicle.model" required />
      </div>

      <div class="mb-3">
        <label for="colour">Vehicle Color:</label>
        <input type="text" class="form-control" id="colour" name="colour" v-model="vehicle.colour" required />
      </div>

      <div class="mb-3">
        <label for="fuelType">Fuel Type:</label>
        <select class="form-select" name="fuelType" id="fuelType" required>
          <option selected disabled>Select a Fuel Type</option>
          <option value="PETROL">Petrol</option>
          <option value="DIESEL">Diesel</option>
          <option value="ELECTRIC">Electric</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="bodyType">Body Type:</label>
        <select class="form-select" name="bodyType" id="bodyType"  required>
          <option selected>Select a Body Type</option>
          <option value="SEDAN">Sedan</option>
          <option value="COUPE">Coupe</option>
          <option value="HATCHBACK">Hatchback</option>
          <option value="CONVERTIBLE">Convertible</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="vehicleCondition">Vehicle Condition:</label>
        <select class="form-select" name="vehicleCondition" id="vehicleCondition" required>
          <option selected disabled>Select a Vehicle Condition</option>
          <option value="NEW">New</option>
          <option value="USED">Used</option>
          <option value="DEMO">Demo</option>
        </select>
      </div>

      <div class="mb-3">
        <span style="color: red; font-size:.75rem; float: right" v-if="errors.year">{{errors.year}}</span>
        <label for="vehicleYear">Vehicle Year:</label>
        <input type="number" class="form-control" id="year" name="year" v-model="post.vehicle.year" required />
      </div>

      <div class="mb-3">
        <label for="mileage">Vehicle Mileage:</label>
        <input type="number" class="form-control" id="mileage" name="mileage" v-model="post.vehicle.mileage"  required/>
      </div>

      <div class="mb-3">
        <label for="branch">Branch:</label>
        <span>No branches available?
          <router-link v-bind:to="{ name: 'create-branch' }">Create one</router-link>
        </span>
        <select class="form-select" name="branch" id="branch" required>
          <option selected disabled>Select a Branch</option>
        </select>
      </div>

      <button class="btn btn-primary fw-bold w-100 p-3">Create Listing</button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import service from '../services/ApiService';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

export default {

  setup() {
    
    const post = ref({
      title: "",
      description: "",
      price: 0,
      vehicle: {
        make: "",
        model: "",
        year: 0,
        colour: "",
        fuelType: "",
        vehicleCondition: "",
        bodyType: ""
      },
      branch: {
        branchId: 0
      }
    });

    const errors = ref({});
    const router = useRouter();
    const toast = useToast(); 

    const validatePost = (value) => {
      value.price < 0 ? errors.value['price'] =  "Price is invalid" : errors.value['price'] =  ""
      value.vehicle.year < 0 ? errors.value['year'] =  "Vehicle year is invalid" : errors.value['year'] =  ""

    }
        

    watch(post.value, (newVal, oldVal) => {
        validatePost(newVal)

        if(errors.value) {
          return;
        }
    });

    const handleSubmit = async () => {
      
      await service.update('post', post.value).then(res => {
              if(res) {
                  toast.success("Post created successfully!", {timeout: 3000})
                  router.push('posts')
              }
          }).catch(err => {
              if(err){
                  toast.error("Oops.. Post with the same name exists already", {timeout: 3000})
              }
          })
    }


    return {
      post, handleSubmit, errors, validatePost
    }
    
  }

}
</script>

<style>
</style>