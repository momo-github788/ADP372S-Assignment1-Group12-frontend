<template>
   <div class="card branch-card">
        <!-- <div class="image-body">
            <img src="https://st4.depositphotos.com/17828278/24401/v/450/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg" class="card-img-top" alt="Car 1">
        </div> -->
        <div class="card-body">
            <h3 class="card-title fw-bold">{{inventory.name}}</h3>
            <p class="card-text">
                <span><span class="fw-bold">Inventory Type:</span> {{inventory.inventoryType}}</span><br/>
                <span><span class="fw-bold">Branch:</span> {{inventory.branch.branchName}}</span><br/>
            </p>

            <div v-if="vehicles" class="mb-2">
                <h6 class="fw-bold">Vehicles in this inventory</h6>
                <div v-for="vehicle in vehicles" :key="vehicle.vehicleId" id="vehicle-inventory-list" class="mt-2" :style="{ backgroundColor: getRandomColor()}" >
                    <span>{{ vehicle.make }} {{ vehicle.model }} {{ vehicle.year }} </span>
                    <span style="float: right; cursor: pointer;" @click="handleDeleteVehicle(vehicle.vehicleId)">X</span>
                </div>
            </div>
        
            
            <router-link id="secondary-btn" class="btn mb-2 mt-3" style="margin-right: .5rem" :to="{name: 'edit-inventory', params: {id: inventory.inventoryId}}">
                Edit <i class="bi bi-file-earmark-text"></i>
            </router-link>

            
            <button id="tertiary-btn" class="btn mb-2 mt-3" style="margin-right: .5rem" @click="handleDelete">Delete <i class="bi bi-trash"></i></button>
        </div>
    </div>
</template>

<script>
import vehicleInventoryService from '../services/VehicleInventoryService'
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getRandomColor} from '../utils/Colors.js'

export default {
    props: ['inventory'],

    setup(props, {emit}) {

        // console.log("props")
        // console.log(props)
        const vehicles = ref(null);
        const toast = useToast();
        const router = useRouter();
        const id = props.inventory.inventoryId;

        onMounted(async() => {
            //console.log("getting all by id " + inventoryId)
            
            vehicles.value = await vehicleInventoryService.getAllVehiclesByInventoryId(id);
            //console.log(vehicles.value)
        })
  
        const handleDelete = () => {
            emit("delete-inventory", id)
        }

  

        const handleDeleteVehicle = (vehicleId) => {
            console.log("click delete vehic,e")


            vehicleInventoryService.deleteVehicleFromInventory(id, vehicleId)
                .then(res => {
                    console.log(res)
                    if(res) {
                        toast.success("Vehicle deleted successfully!")
                        vehicles.value = vehicles.value.filter(v => v.vehicleId !== vehicleId);
                        //router.push('/')
                    }
              
                }).catch(err => {
                    console.log(err)
                    if(err) {
                        toast.error("There was an error deleting, please try again later.")
                    }
                })

        }


        return {
            handleDelete, toast, vehicles, handleDeleteVehicle, id, getRandomColor
        }
    }
}
</script>

<style>
#vehicle-inventory-list {
    padding: .5rem;
    /* background-color: rgb(24, 78, 253); */
    border-radius: 10px;
    width: 350px;
    
}

#vehicle-inventory-list span {
    color: rgb(251, 251, 251);

    font-size: 1.1rem;
    font-weight: 700;
    margin-right: 1rem;
    margin-left: 1rem;
    letter-spacing: -0px;
}
</style>