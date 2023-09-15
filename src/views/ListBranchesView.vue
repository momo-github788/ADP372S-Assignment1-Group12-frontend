<template>
  <Navbar/>
  <div class="container-fluid mt-5 search-filter-container">
    <div class="row">
      <div class="col-md-8 search-results-container mt-3 mb-4">
        <!-- If we get branches from our api, show this -->
        <div v-if="branches">

          <h1 class="fw-bold">All Branches</h1>
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
import { onMounted, ref } from 'vue'
import service from '../services/ApiService'

export default {
  setup() {
    const branches = ref(null);

    onMounted(async () => {
      branches.value = await service.getAll('branch', 'all', null);
    })

    return {
      branches
    }
  }
}
</script>

<style>
</style>