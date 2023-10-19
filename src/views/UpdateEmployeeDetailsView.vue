<template>
  <div class="text-center p-4">
    <h2 class="mb-4 fw-bold">Update Employee Details</h2>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="updateEmployee">
            <div class="mb-2">
              <label for="firstName" class="form-label">First Name:</label>
              <input type="text" class="form-control" id="firstName" name="firstName" v-model="employee.name.firstName" required>
            </div>
            <div class="mb-2">
              <label for="middleName" class="form-label">Middle Name:</label>
              <input type="text" class="form-control" id="middleName" name="middleName" v-model="employee.name.middleName" required>
            </div>
            <div class="mb-2">
              <label for="lastName" class="form-label">Last Name:</label>
              <input type="text" class="form-control" id="lastName" name="lastName" v-model="employee.name.lastName" required>
            </div>
            <div class="mb-2">
              <label for="emailAddress" class="form-label">Email Address:</label>
              <input type="email" class="form-control" id="emailAddress" name="emailAddress" v-model="employee.emailAddress" required>
            </div>
            <div class="mb-2">
              <label for="password" class="form-label">Password:</label>
              <input type="password" class="form-control" id="password" name="password" v-model="employee.password" required>
            </div>
            <button type="submit" class="btn btn-primary w-100 p-3">Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


  
<script>
import axios from 'axios'; // Import Axios for making HTTP requests
axios.defaults.baseURL = 'http://localhost:8080';

export default {
  data() {
    return {
      employee: {
        name: {
          firstName: '',
          middleName: '',
          lastName: '',
        },
        emailAddress: '',
        password: '',
      },
    };
  },
  methods: {
    async updateEmployee() {
      try {
        // Send a PUT request to the API endpoint provided by EmployeeController
        const response = await axios.post('/employee/update', this.employee);

        if (response.status === 200) {
          // Employee was updated successfully
          alert('Employee updated successfully');
        } else {
          // Handle other HTTP status codes or error responses
          alert('Error updating employee');
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error(error);
        alert('Error updating employee');
      }
    },
  },
};
</script>