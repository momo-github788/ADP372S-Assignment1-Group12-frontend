<template>
  <Navbar/>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="mb-4 fw-bold" style="color:rgb(56, 56, 56);">Update User</h1>
        <form @submit.prevent="handleSubmit">
          <div class="mb-2">
            <label for="firstName" class="form-label">First Name</label>
            <span style="color: red; font-size:.75rem; float: right" v-if="errors.firstName">{{errors.firstName}}</span>
            <input type="text" class="form-control" id="firstName" name="firstName" v-model="user.name.firstName" required>
          </div>
          <div class="mb-2">
            <label for="lastName" class="form-label">Last Name</label>
            <span style="color: red; font-size:.75rem; float: right" v-if="errors.lastName">{{errors.lastName}}</span>
            <input type="text" class="form-control" id="lastName" name="lastName" v-model="user.name.lastName" required>
          </div>
          <div class="mb-2">
            <label for="email" class="form-label">Email Address</label>
            <span style="color: red; font-size:.75rem; float: right" v-if="errors.emailAddress">{{errors.emailAddress}}</span>
            <input type="email" class="form-control" id="emailAddress" name="emailAddress" v-model="user.emailAddress" required>
          </div>
          <div class="mb-2">
            <label for="password" class="form-label">Password</label>
            <span style="color: red; font-size:.75rem; float: right" v-if="errors.password">{{errors.password}}</span>
            <input type="password" class="form-control" id="password" name="password" v-model="user.password" required>
          </div>
          <button type="submit" class="fw-bold btn btn-primary w-100 p-3">Update</button>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import { onMounted, ref, watch } from 'vue'
import authService from '../services/AuthService'
import { useToast } from "vue-toastification";
import router from '../router';
import CRUDService from '../services/CRUDService';

export default {
  setup() {
    const toast = useToast();
    const user = ref({
      name: {
        firstName: "",
        lastName: ""
      },
      emailAddress: "",
      password: ""
    })

    const errors = ref({});

    onMounted(async () => {
      user.value = await authService.getByEmail('user', authService.getCurrentUserSubject());


  })


    // Check length < 6
    const validate = (value) => {
      value.name.firstName === '' ? errors.value['firstName'] =  "Required" : errors.value['firstName'] =  ""
      value.name.lastName === '' ? errors.value['lastName'] =  "Required" : errors.value['lastName'] =  ""
      value.emailAddress === '' ? errors.value['emailAddress'] =  "Required" : errors.value['emailAddress'] =  ""
      value.password.length < 6 ? errors.value['password'] =  "Minimum of 6 characters" : errors.value['password'] =  ""

      console.log(errors.value)
    }


    const handleSubmit = async () => {
      if(errors.value.password) {
        toast.error("Password must be at least 6 characters.");
        return;
      }
      await CRUDService.update('user', user.value)
          .then(res => {
            console.log("res")
            console.log(res)
            toast.success("Updated successfully");
            setTimeout(() => {
              router.push('/')
            }, 500)
          }).catch(err => {
            console.log(err)
            toast.error("Error updating user, please try again.");

          })

    }



    return {
      user, handleSubmit, validate, errors
    }
  }
}
</script>

<style>

</style>
