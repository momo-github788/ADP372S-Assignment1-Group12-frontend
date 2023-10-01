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
        response = await axios.get(`${BASE_URL}/${domain}/${action}?title=${title}`)
      } else {
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
}

export default new ApiService()
