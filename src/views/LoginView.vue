<template>
    <Navbar/>
    <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1 class="mb-4 fw-bold">Login</h1>
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
                <button type="submit" class="fw-bold btn btn-primary w-100 p-3">{{ isLoading ? 'Logging up...' : 'Login' }}</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default {
    setup() {
        const router = useRouter();

        const user = ref({
            emailAddress: '',
            password: ''
        });

        const isLoading = ref(false);

        const errors = ref({});


        const handleSubmit = () => {
            console.log(formData.value);
            
            user.value.emailAddress === "" ? errors['emailAddress'] = "Please enter a value" : errors['emailAddress'] = "";
            user.value.password === "" ? errors['password'] = "Please enter a value" : errors['password'] = "";


            if((formData.value.emailAddress === "admin@gmail.com") && (formData.value.password === "password")) {
                router.push("/");
                console.log("success");
            }
        }

        return { user, handleSubmit, isLoading, errors };
        
    }

}
</script>

<style>

</style>