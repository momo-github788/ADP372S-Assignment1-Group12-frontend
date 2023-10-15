import axios from "axios";
import jwtDecode from "jwt-decode";

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
      console.log("request")
      console.log(request)
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
      console.log("request")
      console.log(request)
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

      if(jwt === null || jwt === undefined || jwt == '') {
          return false;
      } else {
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