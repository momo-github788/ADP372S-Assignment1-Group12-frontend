<template>
  <Navbar/>
  <div class="create-branch-container">
  
    <h1 class="fw-bold">Create an Inventory</h1>
    <form @submit.prevent="handleSubmit">
        <div class="mb-3">
            <span style="color: red; font-size:.75rem; float: right" v-if="errors.name">{{errors.name}}</span>
            <label for="name" class="form-label">Inventory Name:</label>
            <input type="text" class="form-control" id="name" name="name" v-model="inventory.name" required>
        </div>

        <div class="mb-3">
        <label for="inventoryType">Inventory Type:</label>
            <select class="form-select" name="inventoryType" id="inventoryType" @change="handleVehicleFilter" v-model="inventory.inventoryType" required>
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
            <!-- <option selected disabled>Select a Vehicle</option> -->
            <option :value="value.vehicleId" :key="key" v-for="(value, key) in vehicles" >{{value.make}} {{value.model}} {{ value.year}} | {{ value.condition}} vehicle</option>
          </select>
      </div>


        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary fw-bold w-100 p-3">Create Inventory</button>
    </form>
</div>
</template>

<script>
import { onMounted, ref, watch } from 'vue';
import crudService from '../services/CRUDService'
import vehicleInventoryService from '../services/VehicleInventoryService'

import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

export default {


    setup() {

        const vehicles = ref(null);
        const branches = ref(null);
        const vehicleId = ref(null);

    

        const inventory = ref({
            name: "", 
            inventoryType: undefined,
            branch: {
                branchId: undefined
            }
        });

        const router = useRouter();
        const toast = useToast(); 
        const errors = ref({});

        const validateInventory = (value) => {
            value.name <= 0 ? errors.value['name'] =  "Name is invalid" : errors.value['name'] =  ""

            // add more validation on other fields
        }

        onMounted(async () => {
            
            branches.value = await crudService.getAll('branch', 'all', null);

        })

        const handleVehicleFilter = async (event) => {
            let type = event.target.value;

            let filteredVehicles = await crudService.getAll('vehicle', 'all', null);

            if(type === "NEW") {
                vehicles.value = filteredVehicles.filter(v => v.condition === "NEW");
            } else if(type === "USED") {
                vehicles.value = filteredVehicles.filter(v => v.condition === "USED");
            } else if(type === "DEMO"){
                vehicles.value = filteredVehicles.filter(v => v.condition === "DEMO");
            }
   
        }
        
        
        watch(inventory.value, (newVal, oldVal) => {
            console.log("watching")
      
            validateInventory(newVal)
               
        });

        const handleSubmit = async () => {
    
       
            if(errors.value.name ) {
                console.log("there are errors")
                return;
            }

            
            // create inventory
            await crudService.create('inventory', inventory.value)
                .then(res => {
                    if(res) {
                        toast.success("Inventory created successfully!", {timeout: 3000})
                        // add vehicle to newly created inventory
                        vehicleInventoryService.createVehicleInventory(res.inventoryId, vehicleId.value)
                            .then(res => {
                                toast.success("Vehicle added to inventory", {timeout: 3000})
                                router.push('/inventories');
                            }).catch(err => {
                                toast.success("Vehicle could not be added to inventory", {timeout: 3000})
                            }) 
                    }
                    
                }).catch(err => {
                    if(err){
                        toast.error("Oops.. Inventory with the same name exists already", {timeout: 3000})
                    }
                })
        }
        return {
            handleSubmit, inventory, errors, validateInventory, vehicles, branches, vehicleId, handleVehicleFilter
        }
    }
}
</script>

<style>

</style>