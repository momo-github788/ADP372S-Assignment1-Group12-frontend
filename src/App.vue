<script setup>
</script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
}

#primary-btn {
    background-color: rgb(21, 79, 155);
    padding: .5rem;
    color: #fff;
    width: 80px;
    border-radius: 10px;
}

#secondary-btn {
    background-color: rgb(41, 45, 51);
    padding: .5rem;
    color: #fff;
    border-radius: 10px;
}

#tertiary-btn {
    background-color: rgb(197, 31, 31);
    padding: .5rem;
    color: #fff;
    border-radius: 10px;
}

body .container-fluid{
    max-width: 90%;
    margin: 0 auto;
}


body .search-filter-container{


}

body .search-filter-container .filter-container{


}

body .search-filter-container .filter-container form {
    padding: 25px;

}


body .search-filter-container .search-form-not-found button {
    padding: .85rem;
    width: 160px;
    background-color: #0e1628;
    color:#fff;
    font-weight: bold;
}

body .search-filter-container .search-results-container {

}

body .search-filter-container .search-results-container .search-result-container {

    width: 100%;
}

body .search-results-container .search-result-container .post-card {
    display: flex;
    flex-direction: row;

}

body .search-results-container .search-result-container .post-card img {
    height: 175px;

}
body .search-results-container .search-result-container .post-card .card-body {

}


body .search-results-container .search-result-container .branch-card {
    display: flex;
    flex-direction: row;

}

body .search-results-container .search-result-container .branch-card img {
    height: 175px;

}
body .search-results-container .search-result-container .branch-card .card-body {

}


.create-branch-container,
.edit-post-container{

    max-width: 600px;
    margin: 4rem auto;
}

.create-branch-container form,
.edit-post-container form {
}

.create-branch-container button,
.edit-post-container button{
    width: 100%;
    padding: .85rem;
}

</style>
