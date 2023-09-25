<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
    <div class="container-fluid">
        <router-link class="navbar-brand text-light fw-bold" :to="{ name: 'landing' }">Vehicle Dealership</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
            <a class="nav-link text-light dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Posts</a>
            <ul class="dropdown-menu">
                <router-link class="dropdown-item text-dark" :to="{ name: 'posts' }">All posts</router-link>
                <router-link class="dropdown-item text-dark" :to="{ name: 'employee-posts'}">My posts</router-link>
                <router-link class="dropdown-item text-dark" :to="{ name: 'watchlisted' }">Watchlisted Posts</router-link>
                <router-link class="dropdown-item text-dark" :to="{ name: 'create-post' }">Create a post</router-link>
            </ul>
            </li>
    
            <li class="nav-item dropdown">
            <a class="nav-link text-light dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Branches</a>
            <ul class="dropdown-menu">
                <router-link class="dropdown-item text-dark" :to="{ name: 'branches' }">All branches</router-link>
                <router-link class="dropdown-item text-dark" :to="{ name: 'create-branch' }">Create a branch</router-link>
            </ul>
            </li>

            <li class="nav-item dropdown">
            <a class="nav-link text-light dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Inventory</a>
            <ul class="dropdown-menu">
                <router-link class="dropdown-item text-dark" :to="{ name: 'inventories' }">All Inventories</router-link>
                <router-link class="dropdown-item text-dark" :to="{ name: 'create-inventory' }">Create an inventory</router-link>
            </ul>
            </li>
        </ul>
    
    
        <form class="d-flex nav-register-login">
            <router-link class="btn btn-primary" style="margin-right:1rem" :to="{ name: 'register' }">Register</router-link>
            <router-link class="btn btn-secondary" :to="{ name: 'login' }">Login</router-link>
        </form>
    
        </div>
    </div>
    </nav>
</template>

<script>
export default {

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