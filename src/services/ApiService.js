import axios from "axios";

const BASE_URL = "http://localhost:8080";

class ApiService {
  


    // for searching posts also
    async getAll(domain, action, title) {
        try {
            let response;
        
            // We know this is for searching posts
            if(title && title != null) {
              console.log("title is not null")
              response = await axios.get(`${BASE_URL}/${domain}/${action}?title=${title}`); 
            } else {
              console.log("title is nuull")
              response = await axios.get(`${BASE_URL}/${domain}/${action}`); 
            }
            return response.data;
          } catch (error) {
            // Handle errors here
            console.error('Error fetching results:', error);
            throw new Error(error.response.data);
          }
    }

    async getById(domain, id) {
        try {
            const response = await axios.get(`${BASE_URL}/${domain}/read/${id}`); 
            return response.data; 
          } catch (error) {
            // Handle errors here
            console.error('Error fetching results:', error);
            throw new Error(error.response.data);
          }
    }

    async create(domain, body, image) {
        try {

            const options = {
              headers: {'Content-Type':'multipart/form-data'}
            }

            const blob = new Blob([JSON.stringify(body)], {
              type: "application/json"
            });

            const formData = new FormData();

            if(image && image != null) { // This is to create a Post, the request contains a image to upload
              console.log("there is an image multipart")
 
              formData.append("image", image)
              formData.append("post", blob);

              const response = await axios.post(`${BASE_URL}/${domain}/create`, formData, options); 
              return response.data; 
            } else if(image == null && domain === 'post') { // This is to create a Post, the request doesnt contain a image to upload
        
              formData.append("post", blob);
              const response = await axios.post(`${BASE_URL}/${domain}/create`, formData, options); 
              return response.data; 
            } else { // This is to create any other type of entity which doesnt accept form data.. just normal request body
              console.log("no image and domain is not post")

              const response = await axios.post(`${BASE_URL}/${domain}/create`, body); 
              return response.data; 
            }

         
          } catch (error) {
            throw new Error(error.response.data);
          }
    }

    async update(domain, body, image) {
        try {

            const options = {
              headers: {'Content-Type':'multipart/form-data'}
            }

            const blob = new Blob([JSON.stringify(body)], {
              type: "application/json"
            });

            const formData = new FormData();
            
            if(image && image != null) { // This is to create a Post, the request contains a image to upload
              console.log("there is an image multipart")
 
              formData.append("image", image)
              formData.append("post", blob);

              const response = await axios.post(`${BASE_URL}/${domain}/update`, formData, options); 
              return response.data; 
            } else if(image == null && domain === 'post') { // This is to create a Post, the request doesnt contain a image to upload
        
              formData.append("post", blob);
              const response = await axios.post(`${BASE_URL}/${domain}/update`, formData, options); 
              return response.data; 
            } else { // This is to create any other type of entity which doesnt accept form data.. just normal request body
              console.log("no image and domain is not post")

              const response = await axios.post(`${BASE_URL}/${domain}/update`, body); 
              return response.data; 
            }
          } catch (error) {
            // Handle errors here

            throw new Error(error.response.data);
          }
    }

    async delete(domain, id) {
        try {
            const response = await axios.delete(`${BASE_URL}/${domain}/delete/${id}`); 
            return response.data; 
          } catch (error) {
            // Handle errors here
            throw new Error(error.response.data);
          }
    }
    
    async createWatchlist(postId) {
      try {
        const response = await axios.get(`${BASE_URL}/watchlist/${postId}`); 
        return response.data; 
      } catch (error) {
        // Handle errors here
        throw new Error(error.response.data);
      }
    }

    async getAllWatchlistedPosts() {
      try {
        const response = await axios.get(`${BASE_URL}/watchlist/all`); 
        return response.data; 
      } catch (error) {
        // Handle errors here
        throw new Error(error.response.data);
      }
    }

    async deleteWatchlistPost(postId) {
      try {
        const response = await axios.delete(`${BASE_URL}/watchlist/delete/${postId}`); 
        return response.data; 
      } catch (error) {
        // Handle errors here
        throw new Error(error.response.data);
      }
    }
    // add login etc

}

export default new ApiService();
