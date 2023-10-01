import axios from "axios"

const BASE_URL = 'http://localhost:8080/post'


class PostService {


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