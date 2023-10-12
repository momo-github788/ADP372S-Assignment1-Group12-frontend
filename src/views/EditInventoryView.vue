<template>
<Navbar/>
  <div class="edit-post-container">
        <div v-if="inventory">
            <h1 class="fw-bold">Edit an Inventory</h1>

            <form @submit.prevent="handleSubmit">
                <div class="mb-3">
                    <label for="name" class="form-label">Inventory Name:</label>
                    <input type="text" class="form-control" id="name" name="name" v-model="inventory.name" required>
                </div>
        
                <div class="mb-3">
                    <label for="inventoryType">Inventory Type:</label>
                    <select disabled class="form-select" name="inventoryType" id="inventoryType" @change="handleVehicleFilter" v-model="inventory.inventoryType" required>
                        <option value="NEW">New</option>
                        <option value="USED">Used</option>
                        <option value="DEMO">Demo</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="branch">Branch:</label>
                    <span>No branches available?<router-link :to="{ name: 'create-branch' }">Create one</router-link></span>
                    <select class="form-select" name="branches" id="branches" v-model="inventory.branch.branchId" required>
                        <option selected disabled>Select a Branch</option>
                        <option :value="value.branchId" :key="key" v-for="(value, key) in branches" >{{value.branchName}}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="vehicle">Vehicle:</label>
                    <select class="form-select" name="vehicles" id="vehicles" v-model="vehicleId"  required>
                        <option selected disabled>Select a Vehicle</option>
                        <option :value="value.vehicleId" :key="key" v-for="(value, key) in vehicles" >{{value.make}} {{value.model}} {{ value.year}} | {{ value.condition}} vehicle </option>
                    </select>
                </div>

                <!-- Submit Button -->
                <button class="btn btn-primary">Update</button>

            </form>
     </div>
     <div v-else>
          <h1 class="fw-bold">There are no results matching this criteria.</h1>
          <router-link :to="{name: 'landing'}" id="primary-btn" style="padding: .75rem; width: 150px" class="btn mt-3">Back to home</router-link>
      </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import crudService from '../services/CRUDService';
import vehicleInventoryService from '../services/VehicleInventoryService';

import { useToast } from "vue-toastification";

export default {

    setup() {
        const inventory = ref(null);
        const route = useRoute();
        const errors = ref({});
        const router = useRouter();
        const toast = useToast();
        const vehicles = ref(null);
        const branches = ref(null);
        const vehicleId = ref(null);
        const inventoryId = route.params.id;


        // perform code as soon as the component mounts (initialization etc)
        onMounted(async () => {
            // id of the given branch

            inventory.value = await crudService.getById('inventory', inventoryId);

            // only show vehicles for this inventory type.. inventory type is disabled and can't be changed
            await crudService.getAll('vehicle', 'all', null)
                .then(res => {
                    vehicles.value = res.filter(v => v.condition === inventory.value.inventoryType)
                })
            
            branches.value = await crudService.getAll('branch', 'all', null);
            
            //options.value = vehicles.value.map(v => v.make + " " + v.model + " " + v.year);

            watch(inventory.value, (newVal, oldVal) => {
                validateInventory(newVal);
            });
        });
        const validateInventory = (value) => {
            value.name <= 0 ? errors.value['name'] = "Name is invalid" : errors.value['name'] = "";
            // add more validation on other fields
        };


        const handleSubmit = async () => {
            console.log(errors.value);
            if (errors.value.name) {
                console.log("there are errors");
                return;
            }

            await crudService.update('inventory', inventory.value)
                .then(res => {
                if (res) {
                    toast.success("Inventory updated successfully!");
                    //router.push('/inventories');
                    console.log("update")
                    console.log(res)
                    console.log("selected vehicle")
                        console.log(vehicleId)
                        // add vehicle to newly created inventory
                        vehicleInventoryService.createVehicleInventory(res.inventoryId, vehicleId.value)
                            .then(res => {
                                toast.success("Vehicle added to inventory", {timeout: 3000})
                                console.log("create vehicle inv")
                                console.log(res)
                                router.push('/inventories');
                            }).catch(err => {
                                toast.success("Vehicle could not be added to inventory", {timeout: 3000})

                                console.log("err vehicle inv")
                                console.log(err)
                            }) 
                }
            }).catch(err => {
                if (err) {
                    toast.error("Oops.. Branch with the same name exists already", { timeout: 3000 });
                }
            });
        };
        return {
            inventory,  errors, validateInventory, handleSubmit, branches, vehicles, vehicleId
        };
    }
}
</script>

<style>

</style>