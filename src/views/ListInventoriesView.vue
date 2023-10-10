<template>
  <Navbar/>
  <div class="container-fluid mt-5 search-filter-container">
    <div class="row">
      <div class="col-md-8 search-results-container mt-3 mb-4">


        <div v-if="!loading">
           <h1 class="fw-bold">All Inventories</h1>

           <div v-if="isAdmin">
            <router-link to="create-inventory">
              <button class="btn btn-primary">Create an Inventory</button>
            </router-link>
           </div> 
        </div>

        <div v-else>
            <h1 class="fw-bold">Loading results..</h1>
            <p>This won't take long</p>
        </div>

        <!-- If we get branches from our api, show this -->
        <div v-if="!loading && inventories">
     
          <div class="row mt-5">
            <div class="col-md-4 mb-2 search-result-container">
              <div class="mb-2" v-for="inventory in inventories" :key="inventory.inventoryId">
                <InventoryCard :inventory="inventory" @delete-inventory="handleDelete(inventory.inventoryId)"/>
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
import crudService from '../services/CRUDService'
import { useToast } from 'vue-toastification';
import { store } from '../store/Store';

export default {
  setup() {

    const inventories = ref(null);
    const loading = ref(true);
    const toast = useToast();
    const isUser = ref(false);
    const isAdmin = ref(false);

    const handleDelete = (id) => {
      crudService.delete('inventory', id)
        .then(res => {
            if(res) {
                toast.success("Inventory deleted successfully!")
                inventories.value = inventories.value.filter(i => i.inventoryId !== id);
                //router.push('/')
            }
            console.log(res)
        }).catch(err => {
            if(err) {
              toast.error("There was an error deleting, please try again later.")
            }
        })
    }

    onMounted(async () => {

      isUser.value = store.isUser;
      isAdmin.value = store.isAdmin;

      //console.log(await service.getAllVehiclesByInventoryId(1))
      inventories.value = await crudService.getAll('inventory', 'all', null);
      //vehicles.value = await service.getAllVehiclesByInventoryId()
      loading.value = false;
      
    })

    return {
      inventories, loading, handleDelete, isAdmin, isUser
    }
  }
}
</script>

<style>
</style>