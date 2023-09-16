<template>
  <Navbar/>
  <div class="create-branch-container">
  
    <h1 class="fw-bold">Create a Branch</h1>
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <label for="branchName" class="form-label">Branch Name:</label>
            <input type="text" class="form-control" id="branchName" name="branchName" v-model="branch.branchName" required>
        </div>

        <div class="mb-3">
            <span style="color: red; font-size:.75rem; float: right" v-if="errors.yearOpened">{{errors.yearOpened}}</span>
            <label for="yearOpened" class="form-label">Year Opened:</label>
            <input type="number" class="form-control" id="yearOpened"  name="yearOpened" v-model="branch.yearOpened" required>
        </div>

        <div class="mb-3">
            <span style="color: red; font-size:.75rem; float: right" v-if="errors.streetNumber">{{errors.streetNumber}}</span>
            <label for="streetNumber" class="form-label">Street Number:</label>
            <input type="number" class="form-control" id="streetNumber" name="streetNumber" v-model="branch.location.streetNumber" required>
        </div>

        <!-- Additional User Details -->
        <div class="mb-3">
            <label for="streetName" class="form-label">Street name:</label>
            <input type="text" class="form-control" id="streetName" name="streetName" v-model="branch.location.streetName" required>
        </div>

        <div class="mb-3">
            <label for="city" class="form-label">City:</label>
            <input type="text" class="form-control" id="city" name="city" v-model="branch.location.city" required>
        </div>



        <div class="mb-3">
            <label for="postalCode" class="form-label">Postal Code:</label>
            <input type="number" class="form-control" id="postalCode" name="postalCode" v-model="branch.location.postalCode" required>
        </div>

        <div class="mb-3">
            <label for="province" class="form-label">Province:</label>
            <input type="text" class="form-control" id="province" name="province" v-model="branch.location.province" required>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary fw-bold w-100 p-3">Create Branch</button>
    </form>
</div>
</template>

<script>
import { ref, watch } from 'vue';
import service from '../services/ApiService'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

export default {


    setup() {
        const branch = ref({
            "branchName": "", 
            "yearOpened": undefined,
            "location": {
                "streetNumber": undefined,
                "streetName": "",
                "city": "",
                "postalCode": undefined,
                "province": ""
            }
        });

        const router = useRouter();
        const toast = useToast(); 
        const errors = ref({});

        const validateBranch = (value) => {
            value.yearOpened <= 0  || value.yearOpened.length < 4 ? errors.value['yearOpened'] =  "Year Opened is invalid" : errors.value['yearOpened'] =  ""
            value.location.streetNumber <= 0 ? errors.value['streetNumber'] =  "Street Number is invalid" : errors.value['streetNumber'] =  ""
            value.location.postalCode <= 0 ? errors.value['postalCode'] =  "Postal Code is invalid" : errors.value['postalCode'] =  ""
    
            // add more validation on other fields
        }
        
        
        watch(branch.value, (newVal, oldVal) => {
            console.log("watching")
      
            validateBranch(newVal)
               
        });

        const handleSubmit = async () => {
    
       
            if(errors.value.yearOpened || errors.value.streetNumber || errors.value.postalCode) {
                console.log("there are errors")
                return;
            }

            await service.create('branch', branch.value)
                .then(res => {
                    if(res) {
                        toast.success("Branch created successfully!", {timeout: 3000})
                        router.push('branches')
                    }
                    
                }).catch(err => {
                    if(err){
                        toast.error("Oops.. Branch with the same name exists already", {timeout: 3000})
                    }
                })
        }
        return {
            handleSubmit, branch, errors, validateBranch
        }
    }
}
</script>

<style>

</style>