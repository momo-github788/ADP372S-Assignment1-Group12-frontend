import axios from "axios"
import { authStore } from '../store/AuthStore';


const BASE_URL = `${authStore.APP_URL}/vehicleInventory`;
class VehicleInventoryService {
    async createVehicleInventory(inventoryId, vehicleId) {
        try {
    
          const request = {
            inventoryId: inventoryId,
            vehicleId: vehicleId
          }
    
          console.log("request")
          console.log(request)
    
          const response = await axios.post(`${BASE_URL}/create`, request)
          return response.data
        } catch (error) {
          // Handle errors here
          throw new Error(error.response.data)
        }
      }
    
      async getAllVehiclesByInventoryId(inventoryId) {
        try {
          const response = await axios.get(`${BASE_URL}/all/${inventoryId}`)
          return response.data
        } catch (error) {
          // Handle errors here
          throw new Error(error.response.data)
        }
      }
    
      async deleteVehicleFromInventory(inventoryId, vehicleId) {
        try {
          const request = {
            inventoryId: inventoryId,
            vehicleId: vehicleId
          }
          console.log(request)
    
          const response = await axios.delete(`${BASE_URL}/delete`, request)
          return response.data
        } catch (error) {
          // Handle errors here
          throw new Error(error.response.data)
        }
      }

}

export default new VehicleInventoryService();