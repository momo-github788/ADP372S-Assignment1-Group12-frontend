import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

class ApiService {


  // CRUD
  // for searching posts also
  async getAll(domain, action, title) {
    try {
      let response

      // We know this is for searching posts
      if (title && title != null) {
        console.log('title is not null')
        response = await axios.get(`${BASE_URL}/${domain}/${action}?title=${title}`)
      } else {
        console.log('title is nuull')
        response = await axios.get(`${BASE_URL}/${domain}/${action}`)
      }
      return response.data
    } catch (error) {
      // Handle errors here
      console.error('Error fetching results:', error)
      throw new Error(error.response.data)
    }
  }

  async getById(domain, id) {
    try {
      const response = await axios.get(`${BASE_URL}/${domain}/read/${id}`)
      return response.data
    } catch (error) {
      // Handle errors here
      console.error('Error fetching results:', error)
      throw new Error(error.response.data)
    }
  }

  async create(domain, body) {
    try {
      const response = await axios.post(`${BASE_URL}/${domain}/create`, body)
      return response.data
    } catch (error) {
      throw new Error(error.response.data)
    }
  }

  async update(domain, body) {
    try {
      const response = await axios.post(`${BASE_URL}/${domain}/update`, body)
      return response.data
    } catch (error) {
      // Handle errors here
      throw new Error(error.response.data)
    }
  }

  async delete(domain, id) {
    try {
      const response = await axios.delete(`${BASE_URL}/${domain}/delete/${id}`)
      return response.data
    } catch (error) {
      // Handle errors here
      throw new Error(error.response.data)
    }
  }

  async deleteImageUpload(id) {
    try {
      const response = await axios.delete(BASE_URL + `/upload/delete/${id}`);
      return response.data
    } catch (error) {
      // Handle errors here
      throw new Error(error.response.data)
    }
  }

  async createOrUpdatePost(action, body, image) {
    console.log("action " + action)
    const options = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    const blob = new Blob([JSON.stringify(body)], {
      type: 'application/json'
    })

    const formData = new FormData()

    try {
      if (image && image != null) {
        console.log('there is an image multipart')

        formData.append('image', image)
        formData.append('post', blob)

        const response = await axios.post(`${BASE_URL}/post/${action}`, formData, options)
        return response.data
      } else {
        console.log('tHERE IS NO IMAGE MULTIPART')
        formData.append('post', blob)
        const response = await axios.post(`${BASE_URL}/post/${action}`, formData, options)
        return response.data
      }
    } catch (error) {
      // Handle errors here
      throw new Error(error.response.data)
    }
  }


  async createWatchlist(postId) {
    try {
      const response = await axios.get(`${BASE_URL}/watchlist/${postId}`)
      return response.data
    } catch (error) {
      // Handle errors here
      throw new Error(error.response.data)
    }
  }

  async getAllWatchlistedPosts() {
    try {
      const response = await axios.get(`${BASE_URL}/watchlist/all`)
      return response.data
    } catch (error) {
      // Handle errors here
      throw new Error(error.response.data)
    }
  }

  async deleteWatchlistPost(postId) {
    try {
      const response = await axios.delete(`${BASE_URL}/watchlist/delete/${postId}`)
      return response.data
    } catch (error) {
      // Handle errors here
      throw new Error(error.response.data)
    }
  }

  async createVehicleInventory(inventoryId, vehicleId) {
    try {

      const request = {
        inventoryId: inventoryId,
        vehicleId: vehicleId
      }

      console.log("request")
      console.log(request)

      const response = await axios.post(`${BASE_URL}/vehicleInventory/create`, request)
      return response.data
    } catch (error) {
      // Handle errors here
      throw new Error(error.response.data)
    }
  }

  async getAllVehiclesByInventoryId(inventoryId) {
    try {
      const response = await axios.get(`${BASE_URL}/vehicleInventory/all/${inventoryId}`)
      return response.data
    } catch (error) {
      // Handle errors here
      throw new Error(error.response.data)
    }
  }

  async deleteVehicleFromInventory(inventoryId, vehicleId) {
    try {
      const request = {
        vehicleId: vehicleId,
        inventoryId: inventoryId
      }

      const response = await axios.delete(`${BASE_URL}/vehicleInventory/delete`, JSON.parse(request))
      return response.data
    } catch (error) {
      // Handle errors here
      throw new Error(error.response.data)
    }
  }
  // add login etc
}

export default new ApiService()
