import axios from "axios"

const BASE_URL = 'http://localhost:8080/watchlist'

class WatchlistPostService {
    async createWatchlist(postId) {
        try {
          const response = await axios.get(`${BASE_URL}/${postId}`)
          return response.data
        } catch (error) {
          // Handle errors here
          throw new Error(error.response.data)
        }
      }
    
      async getAllWatchlistedPosts() {
        try {
          const response = await axios.get(`${BASE_URL}/all`)
          return response.data
        } catch (error) {
          // Handle errors here
          throw new Error(error.response.data)
        }
      }
    
      async getWatchlistedPostByPostId(postId) {
        try {
          const response = await axios.get(`${BASE_URL}/read/${postId}`)
          return response.data
        } catch (error) {
          // Handle errors here
          throw new Error(error.response.data)
        }
      }
    
    
      async deleteWatchlistPost(postId) {
        try {
          const response = await axios.delete(`${BASE_URL}/delete/${postId}`)
          return response.data
        } catch (error) {
          // Handle errors here
          throw new Error(error.response.data)
        }
      }
}

export default new WatchlistPostService();