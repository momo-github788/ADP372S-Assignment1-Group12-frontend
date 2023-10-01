<template>
    <Navbar/>
  <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1 class="mb-4 fw-bold">Register</h1>
            <form @submit.prevent="handleSubmit">
                <div class="mb-2">
                    <label for="firstName" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="firstName" name="firstName" v-model="user.name.firstName" required>
                </div>
                <div class="mb-2">
                    <label for="lastName" class="form-label">Last Name</label>
                    <input type="text" class="form-control" id="lastName" name="lastName" v-model="user.name.lastName" required>
                </div>
                <div class="mb-2">
                    <label for="email" class="form-label">Email Address</label>
                    <input type="email" class="form-control" id="emailAddress" name="emailAddress" v-model="user.emailAddress" required>
                </div>
                <div class="mb-2">
                    <label for="password" class="form-label">Password</label>
                    <span style="color: red; font-size:.75rem; float: right" v-if="errors.password">{{errors.password}}</span>
                    <input type="password" class="form-control" id="password" name="password" v-model="user.password" required>
                </div>
                <button type="submit" class="fw-bold btn btn-primary w-100 p-3">Register</button>
            </form>
        </div>
    </div>
</div>

</template>

<script>
import { ref, watch } from 'vue'
import authService from '../services/AuthService'
export default {
    setup() {
        const user = ref({
            name: {
                firstName: "",
                lastName: ""
            },
            emailAddress: "",
            password: ""
        })

        const errors = ref({});

        // Check length < 6
        const validatePassword = (value) => {
            value.length < 6 ? errors.value['password'] =  "Minimum of 6 characters" : errors.value['password'] =  ""
        }

        // This runs everytime a change is made to user object, can make validation here to show in real time ..
        watch(user.value, (newVal,oldVal) => {
            console.log("in watch")
            validatePassword(newVal.password);

            if(errors.value) {
                return;
            }
        })

        const handleSubmit = async () => {
            const result = await authService.register('user', user.value);
            console.log(result)
        }

        

        return {
            user, handleSubmit, validatePassword, errors
        }
    }
}
</script>

<style>

</style>