<template>
    <Navbar/>
    <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1 class="mb-4 fw-bold" style="color:rgb(56, 56, 56);">Employee Login</h1>
            <form @submit.prevent="handleSubmit">
                <div class="mb-2">  
                    <span style="color: red; font-size:.75rem; float: right" v-if="errors.emailAddress">{{errors.emailAddress}}</span>
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" id="email" name="email" v-model="user.emailAddress" required>
                </div>
                <div class="mb-2">
                    <span style="color: red; font-size:.75rem; float: right" v-if="errors.password">{{errors.password}}</span>
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" name="password" v-model="user.password" required>
                </div>
                <button type="submit" class="fw-bold btn btn-danger w-100 p-3">{{ isLoading ? 'Logging up...' : 'Login' }}</button>

                <p>Please click <router-link :to="{name: 'login-user'}"> here </router-link> to log in as a User.</p>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import { ref, watch} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import authService from '../services/AuthService';
import { useToast } from "vue-toastification";
import { store } from '../store/Store';

export default {
    setup() {
        const toast = useToast();
        const router = useRouter();

        const user = ref({
            emailAddress: '',
            password: ''
        });

        const isLoading = ref(false);

        const errors = ref({});

        const handleSubmit = () => {
            console.log(user.value);

            authService.loginEmployee(user.value).then(res => {
                if(res) {
                    toast.success("Login successful")
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 1500)
                }
             
            }).catch(err => {
                toast.error("Invalid credentials")
            })
            
        }

        const validate = (value) => {
            value.emailAddress === '' ? errors.value['emailAddress'] =  "Required" : errors.value['emailAddress'] =  ""
            value.password.length < 6 ? errors.value['password'] =  "Minimum of 6 characters" : errors.value['password'] =  ""

            console.log(errors.value)
        }

        // This runs everytime a change is made to user object, can make validation here to show in real time ..
        watch(user.value, (newVal,oldVal) => {
            console.log("in watch")
            validate(newVal);

            if(errors.value) {
                return;
            }
        })

        return { user, handleSubmit, isLoading, errors, validate };
        
    }

}
</script>

<style>

</style>