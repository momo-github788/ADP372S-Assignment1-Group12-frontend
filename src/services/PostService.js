import axios from "axios"
import { authStore } from '../store/AuthStore';

const BASE_URL = `${authStore.APP_URL}/post`;


class PostService {

  async getAllEmployeePosts() {
    try {
      const response = await axios.get(`${BASE_URL}/all/employee`)
      console.log("employee post")
      console.log(response)
      return response.data
    } catch (error) {
      // Handle errors here
      console.error('Error fetching results:', error)
      throw new Error(error.response.data.message)
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
    
            const response = await axios.post(`${BASE_URL}/${action}`, formData, options)
            return response.data
          } else {
            console.log('tHERE IS NO IMAGE MULTIPART')
            formData.append('post', blob)
            const response = await axios.post(`${BASE_URL}/${action}`, formData, options)
            return response.data
          }
        } catch (error) {
          // Handle errors here
          throw new Error(error.response.data)
        }
      }
}

export default new PostService();