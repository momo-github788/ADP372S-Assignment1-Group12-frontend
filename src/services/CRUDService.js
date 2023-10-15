import axios from 'axios'
import AuthService from './AuthService';
import { store } from '../store/Store';

const BASE_URL = 'http://localhost:8080'

// Add Authorization token to header of EVERY request made to our api
// Like a middleware
axios.interceptors.request.use( config => {

  const user = AuthService.getCurrentUserJwt();
  console.log("axios.interceptors: ", user)
  if(user){
      const isAdmin = store.isAdmin;
      config.headers.Authorization = 'Bearer ' + user.jwt;
      config.url = config.url + `?type=${isAdmin? "EMPLOYEE" : "USER"}`
  
  }
  return config;
});

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
