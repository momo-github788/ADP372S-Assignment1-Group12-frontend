<template>
  <Navbar/>
  <div class="container-fluid mt-5 search-filter-container">
    <div class="row">
      <div class="col-md-8 search-results-container mt-3 mb-4">


        <div v-if="!loading">
           <h1 class="fw-bold">All Branches</h1>
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
                <BranchCard :branch="branch" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, ref } from 'vue'
import service from '../services/ApiService'

export default {
  setup() {
    const branches = ref(null);
    const loading = ref(true);



    onMounted(async () => {
     
      setTimeout(async () => {
          branches.value = await service.getAll('branch', 'all', null);
          loading.value = false;
      }, 750)
      
    })

    return {
      branches, loading
    }
  }
}
</script>

<style>
</style>