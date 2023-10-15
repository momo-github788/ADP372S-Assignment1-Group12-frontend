import axios from "axios";
import jwtDecode from "jwt-decode";
import { useToast } from "vue-toastification";


const BASE_URL = 'http://localhost:8080/auth'



class AuthService {

    async registerUser(request) {
      console.log("request")
      console.log(request)
      try {
          const response = await axios.post(`${BASE_URL}/user/register`, request);

          return response.data
      } catch (error) {
        // Handle errors here
        throw new Error(error.response.data.message)
      }
    }

    async registerEmployee(request) {
      console.log("request")
      console.log(request)
      try {
          const response = await axios.post(`${BASE_URL}/employee/register`, request);

          return response.data
      } catch (error) {
        // Handle errors here
        throw new Error(error.response.data.message)
      }
    }
  
    async loginUser(request) {

      if(this.getCurrentUserJwt()) {
        useToast().error("You are already logged in..")
        return;
      }
  
      try {
          const response = await axios.post(`${BASE_URL}/login?type=USER`, request);
        
    
          console.log(response)
          if(response) {
            console.log("setting local storgae..")
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data
      } catch (error) {
        throw new Error(error.response.data)
      }

    }

    async loginEmployee(request) {
      if(this.getCurrentUserJwt()) {
        useToast().error("You are already logged in..")
        return;
      }
      try {
          const response = await axios.post(`${BASE_URL}/login?type=EMPLOYEE`, request);
          console.log(response)
          if(response) {
            console.log("setting local storgae..")
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data
      } catch (error) {
        throw new Error(error.response.data)
      }

    }


    logout = () => {
      localStorage.removeItem("user");
      window.location.href = "/"
    }

    getCurrentUserJwt  = () => {

      let jwt = JSON.parse(localStorage.getItem("user"))
      console.log("jwwt")
      console.log(jwt)
      if(jwt === null) {
        console.log("return false")
          return false;
      } else {
        console.log("return jwt")

          return jwt;
      }

      
  }

  getCurrentUserSubject = () => {
      let token = this.getCurrentUserJwt().jwt;
      let decodedToken
      if(token) {
          decodedToken = jwtDecode(token)
    
      } else {
          return token
      }

      return decodedToken.sub
  }

}

export default new AuthService();