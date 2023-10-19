<template>
    <div>
      <h1 class="fw-bold">Edit a Branch</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="branchName" class="form-label">Branch Name:</label>
          <input type="text" class="form-control form-control-sm" id="branchName" name="branchName" v-model="branch.branchName" required>
        </div>
  
        <div class="mb-3">
          <span style="color: red; font-size: 0.75rem; float: right" v-if="errors.yearOpened">{{ errors.yearOpened }}</span>
          <label for="yearOpened" class="form-label">Year Opened:</label>
          <input type="number" class="form-control form-control-sm" id="yearOpened" name="yearOpened" v-model="branch.yearOpened" required>
        </div>
  
        <div class="mb-3">
          <span style="color: red; font-size: 0.75rem; float: right" v-if="errors.streetNumber">{{ errors.streetNumber }}</span>
          <label for="streetNumber" class="form-label">Street Number:</label>
          <input type="number" class="form-control form-control-sm" id="streetNumber" name="streetNumber" v-model="branch.location.streetNumber" required>
        </div>
  
        <!-- Additional User Details -->
        <div class="mb-3">
          <label for="streetName" class="form-label">Street name:</label>
          <input type="text" class="form-control form-control-sm" id="streetName" name="streetName" v-model="branch.location.streetName" required>
        </div>
  
        <div class="mb-3">
          <label for="city" class="form-label">City:</label>
          <input type="text" class="form-control form-control-sm" id="city" name="city" v-model="branch.location.city" required>
        </div>
  
        <div class="mb-3">
          <span style="color: red; font-size: 0.75rem; float: right" v-if="errors.postalCode">{{ errors.postalCode }}</span>
          <label for="postalCode" class="form-label">Postal Code:</label>
          <input type="number" class="form-control form-control-sm" id="postalCode" name="postalCode" v-model="branch.location.postalCode" required>
        </div>
  
        <div class="mb-3">
          <label for="province" class="form-label">Province:</label>
          <input type="text" class="form-control form-control-sm" id="province" name="province" v-model="branch.location.province" required>
        </div>
  
        <!-- Submit Button -->
        <button class="btn btn-primary">Update</button>
      </form>
    </div>
  </template>
  

<script>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import crudService from '../services/CRUDService';
import { useToast } from "vue-toastification";

export default {
    setup() {
        const branch = ref(null);
        const route = useRoute();
        const errors = ref({});
        const router = useRouter();
        const toast = useToast(); 

        // perform code as soon as the component mounts (initialization etc)
        onMounted(async () => {
      
            // id of the given branch
            const id = route.params.id;
            branch.value = await crudService.getById('branch', id);

            watch(branch.value, (newVal, oldVal) => {
                console.log("watching..")
                validateBranch(newVal)
    
            });

        })



        const validateBranch = (value) => {
            value.yearOpened <= 0 ? errors.value['yearOpened'] =  "Year Opened is invalid" : errors.value['yearOpened'] =  ""
            value.location.streetNumber <= 0 ? errors.value['streetNumber'] =  "Street Number is invalid" : errors.value['streetNumber'] =  ""
            value.location.postalCode <= 0 ? errors.value['postalCode'] =  "Postal Code is invalid" : errors.value['postalCode'] =  ""

            // add more validation on other fields
        }
        
        
        const handleSubmit = async () => {
            console.log(errors.value)


            if(errors.value.yearOpened || errors.value.streetNumber || errors.value.postalCode) {
                console.log("there are errors")
                return;
            }

            await crudService.update('branch', branch.value)
                .then(res => {
                    if(res) {
                        toast.success("Branch updated successfully!")
                        router.push('/branches')
                    }
                    
                }).catch(err => {
                    if(err){
                        toast.error("Oops.. Branch with the same name exists already", {timeout: 3000})
                    }
                })
        }

        return {
            branch, errors,validateBranch, handleSubmit
        }
    }
}
</script>

<style>

</style>