<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <div class="container-fluid">
        <router-link class="navbar-brand text-light fw-bold" :to="{ name: 'landing' }">DreamCruise Dealers</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
      
            <li class="nav-item dropdown">
                <a class="nav-link text-light dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Posts</a>
                <ul class="dropdown-menu">
                    <router-link class="dropdown-item text-dark" :to="{ name: 'posts' }">All posts</router-link>

                    <div v-if="isAdmin">
                        <router-link class="dropdown-item text-dark" :to="{ name: 'employee-posts'}">My posts</router-link>
                        <router-link class="dropdown-item text-dark" :to="{ name: 'create-post' }">Create a post</router-link>
                    </div>

                    <div v-if="isUser">
                        <router-link class="dropdown-item text-dark" :to="{ name: 'watchlisted' }">Watchlisted Posts</router-link>
                    </div>  
                </ul>
            </li>
    
            <li class="nav-item dropdown">
                <a class="nav-link text-light dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Branches</a>
                <ul class="dropdown-menu">
                    <router-link class="dropdown-item text-dark" :to="{ name: 'branches' }">All branches</router-link>
                    <div v-if="isAdmin">
                        <router-link class="dropdown-item text-dark" :to="{ name: 'create-branch' }">Create a branch</router-link>
                    </div>
                </ul>
            </li>

            <li class="nav-item dropdown">
            <a class="nav-link text-light dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Inventory</a>
            <ul class="dropdown-menu">
                <router-link class="dropdown-item text-dark" :to="{ name: 'inventories' }">All Inventories</router-link>
                <div v-if="isAdmin">
                    <router-link class="dropdown-item text-dark" :to="{ name: 'create-inventory' }">Create an inventory</router-link>
                </div>
            </ul>
            </li>
        </ul>
    
    
        <form class="d-flex nav-register-login">


            <div v-if="isUser || isAdmin">
                <router-link :to="{name: 'update-user'}" v-if="isUser">
                    <button  class="btn btn-danger" style="margin-right: 1rem;" >
                        My Profile
                    </button>
                </router-link>

                <router-link :to="{name: 'update-employee'}" v-if="isAdmin">
                    <button  class="btn btn-danger" style="margin-right: 1rem;" >
                        My Profile
                    </button>
                </router-link>


                <button @click="logout" class="btn btn-primary" >
                    Logout
                </button>
            </div>
            <div v-else class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown ">
                    <a id="primary-btn" style="text-decoration: none;"  data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">User Authentication </a>
                    <ul class="dropdown-menu">
                        <router-link class="dropdown-item text-dark" :to="{ name: 'register-user' }">Register</router-link>
                        <router-link class="dropdown-item text-dark" :to="{ name: 'login-user' }">Login</router-link>
                    </ul>
                </li>
                <span class="p-1"></span>

                <li class="nav-item dropdown ">
                    <a id="tertiary-btn" style="text-decoration: none;" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Employee Authentication</a>
                    <ul class="dropdown-menu">
                        <router-link class="dropdown-item text-dark" :to="{ name: 'register-employee' }">Register</router-link>
                        <router-link class="dropdown-item text-dark" :to="{ name: 'login-employee' }">Login</router-link>
                    </ul>
                </li>
            </div>
      
        </form>
    
        </div>
    </div>
    </nav>
</template>

<script>
import { onMounted, ref } from 'vue';
import authService from '../services/AuthService';
import { useRoute, useRouter } from 'vue-router';
import { store } from '../store/Store';
import AuthService from '../services/AuthService';
export default {

    setup() {
        const isUser = ref(false);
        const isAdmin = ref(false);
        const isAuth = ref(false);
        const principal = ref(null);

        const router = useRouter();
        
        onMounted(() => {
            principal.value = "user@gmail.com"
            isAdmin.value = store.isAdmin;
            isUser.value = store.isUser;
            isAuth.value = store.isAuth;

        })

        const logout = () => {
            authService.logout();
        
        }

        return {
            isAdmin, isUser, isAuth, principal, logout
        }
    }
};
</script>

<style scoped>
    nav{
        color: #0e1628;
    }

    nav .nav-search-form input button {

        font-weight: bold;
    }

</style>