<template>
  <Navbar/>
  <div class="container-fluid mt-5 search-filter-container">
    <div class="row">
      <div class="col-md-8 search-results-container mt-3 mb-4">


        <div v-if="!loading">
           <h1 class="fw-bold">All Branches</h1>

          <router-link to="create-branch">
            <button class="btn btn-primary">Create a Branch</button>
          </router-link>
           
        </div>

        <div v-else>
            <h1 class="fw-bold">Loading results..</h1>
            <p>This won't take long</p>
        </div>

        <!-- If we get branches from our api, show this -->
        <div v-if="!loading && branches">
     
          <div class="row mt-5">
            <div class="col-md-4 mb-2 search-result-container">
              <div class="mb-2" v-for="branch in branches" :key="branch.branchId">
                <BranchCard :branch="branch" @delete-branch="handleDelete(branch.branchId)" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted,watch, ref } from 'vue'
import service from '../services/ApiService'
import { useToast } from "vue-toastification";


export default {
  setup() {
    const branches = ref(null);
    const loading = ref(true);
    const toast = useToast();
   
    const handleDelete = (id) => {
      console.log("emitted " + id)
      service.delete('branch', id)
        .then(res => {
            if(res) {
                toast.success("Branch deleted successfully!")
                branches.value = branches.value.filter(b => b.branchId !== id)
            }
            console.log(res)
        }).catch(err => {
            if(err) {
                toast.error("Post located at this branch is in use, delete that post to remove the branch.")
            }
        })

  
    }

    onMounted(async () => {
     
      branches.value = await service.getAll('branch', 'all', null);
      loading.value = false;

      watch(branches.value, (newVal, oldVal) => {
        console.log("watching")
      })
      
    })

    return {
      branches, loading, handleDelete
    }
  }
}
</script>

<style>
</style>