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


#upload-image-container {
  border-radius: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  background-color: #F4F6F9;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}


#upload-image-container .add-or-update-images-form .add-or-update-images-form-group .upload-images-container .display {
  display: block;
}

#upload-image-container  .add-or-update-images-form .add-or-update-images-form-group .upload-images-container .hide {
  display: none;
}

#upload-image-container label p{
  width: 75%;
  margin: 0 auto;
  letter-spacing: -.6px;
  font-weight: bold;
  color: rgb(88, 88, 88);

}


#upload-image-container .file-input{
  height: 0;
  overflow: hidden;
  width: 0;
}


#upload-image-preview-container {

 }

#upload-image-preview-container img {
  width: 100%;
  object-fit: contain;
  background-color: palegoldenrod;
  margin: 1rem 0 1rem 0;
  border-radius: 10px;
}

#remove-image-btn {
    font-weight: bold;
    background-color: rgb(216, 63, 63);
    padding: .75rem;
    color: #fff;
    border-radius: 10px;
    margin-bottom: 2rem;
}

</style>
