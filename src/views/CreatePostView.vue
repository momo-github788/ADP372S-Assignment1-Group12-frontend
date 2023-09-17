<template>
    <Navbar />
  <div class="create-branch-container">

    <h1 class="fw-bold">Create a Post</h1>
    <form @submit.prevent="handleSubmit">

      
      <div id="upload-image-container">
        <label for="file-input">
            <i style="font-size: 2.5rem; color:  rgb(88, 88, 88);" class="bi bi-cloud-upload"></i>
            <p className="upload-text"> Uploading an image makes the post more likely to be viewed.</p>
            <input type="file" id="file-input" @change="handleImageChange" className="file-input shadow-none choose-category"  />
        </label>
      </div>

      <div v-if="previewSelectedImage">
        <div id="upload-image-preview-container" >
          <img :src="previewSelectedImage" alt="Vehicle image"/>
        </div>

        <button class="btn" id="remove-image-btn" @click="removeImage">Remove</button>
      </div>
   
      <!-- Post Information -->
      <div class="mb-3">
        <label for="title">Title:</label>
        <input type="text" class="form-control" id="title" name="title" v-model="post.title" required />
      </div>

      <div class="mb-3">
        <label for="description">Description:</label>
        <textarea class="form-control" id="description" name="description" v-model="post.description" required></textarea>
      </div>

      <div class="mb-3">
        <span style="color: red; font-size:.75rem; float: right" v-if="errors.price">{{errors.price}}</span>
        <label for="price">Price:</label>
        <input type="number" class="form-control" id="price" name="price" v-model="post.price" required />
      </div>

      <!-- Vehicle Information -->
      <div class="mb-3">
        <label for="make">Vehicle Make:</label>
        <input type="text" class="form-control" id="make" name="make" v-model="post.vehicle.make" required />
      </div>

      <div class="mb-3">
        <label for="model">Vehicle Model:</label>
        <input type="text" class="form-control" id="model" name="model" v-model="post.vehicle.model" required />
      </div>

      <div class="mb-3">
        <label for="colour">Vehicle Color:</label>
        <input type="text" class="form-control" id="colour" name="colour" v-model="post.vehicle.colour" required />
      </div>

      <div class="mb-3">
        <label for="fuelType">Fuel Type:</label>
        <select class="form-select" name="fuelType" id="fuelType" v-model="post.vehicle.fuelType" required>
          <option value="PETROL">Petrol</option>
          <option value="DIESEL">Diesel</option>
          <option value="ELECTRIC">Electric</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="bodyType">Body Type:</label>
        <select class="form-select" name="bodyType" id="bodyType" v-model="post.vehicle.bodyType" required>
          <option value="SEDAN">Sedan</option>
          <option value="COUPE">Coupe</option>
          <option value="HATCHBACK">Hatchback</option>
          <option value="CONVERTIBLE">Convertible</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="condition">Vehicle Condition:</label>
        <select class="form-select" name="condition" id="condition" v-model="post.vehicle.condition" required>
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
          <span>No branches available?<router-link :to="{ name: 'create-branch' }">Create one</router-link></span>
          <select class="form-select" name="branches" id="branches" v-model="post.branch.branchId" required>
            <option selected disabled>Select a Branch</option>
            <option :value="value.branchId" :key="key" v-for="(value, key) in branches" >{{value.branchName}}</option>
          </select>
      </div>

      <button class="btn btn-primary fw-bold w-100 p-3">Create Listing</button>
    </form>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import service from '../services/ApiService';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

export default {

  setup() {
    
    const post = ref({
      title: "",
      description: "test",
      price: 9993,
      vehicle: {
        make: "audi",
        model: "a3",
        year: 222,
        mileage: 222,
        colour: "red",
        fuelType: 'PETROL',
        condition: 'USED',
        bodyType: 'SEDAN'
      },
      branch: {
        branchId: 1
      }
    });

    const selectedImage = ref(null);
    const previewSelectedImage = ref(null);
    const branches = ref(null);
    const errors = ref({});
    const router = useRouter();
    const toast = useToast(); 

    const removeImage = () => {
      previewSelectedImage.value = null;
      selectedImage.value = null;

         console.log("previewSelectedImage")
      console.log(previewSelectedImage.value)

        console.log("selectedImage")
      console.log(selectedImage.value)
    }


    const handleImageChange = (event) => {
      const file = event.target.files[0];
  

      previewSelectedImage.value = URL.createObjectURL(file);
      selectedImage.value = file;

      console.log("previewSelectedImage")
      console.log(previewSelectedImage.value)

        console.log("selectedImage")
      console.log(selectedImage.value)
    }

    onMounted(async () => {
      branches.value = await service.getAll('branch', 'all', null);

    })

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
      console.log("submitting")
      console.log(post.value)
      console.log(selectedImage.value)
      
      await service.create('post', post.value, selectedImage.value).then(res => {

          if(res) {
                  console.log("create success")
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
      post, branches, handleSubmit, errors, validatePost, handleImageChange, selectedImage, previewSelectedImage, removeImage
    }
    
  }

}
</script>


<style>
</style>