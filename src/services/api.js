import axios from "axios";

const API_URL = "http://localhost:5000/api";

const AuthService = {
  signup: async (userData) => {
    // Simulate a signup request to the backend
    try {
      // Replace the following line with an actual API call to your backend
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Signup failed");
    }
  },

  getProfile: async () => {
    // Simulate a request to get user profile from the backend
    try {
      // Replace the following line with an actual API call to your backend
      const response = await fetch(`${API_URL}/api/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the user's token
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get profile");
      }

      return data;
    } catch (error) {
      throw new Error(error.message || "Failed to get profile");
    }
  },
  
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      // Save token in local storage or context
      return response;
    } catch (error) {
      throw error;
    }
  },

  getTasks:  async (authToken) => {
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: {
          Authorization: `${authToken}`, // Include the authentication token in the headers
        },
      });
      return response.data; // Assuming the relevant data is stored in the response's data property
    } catch (error) {
      throw error;
    }
  },

  postTask: async (taskData, authToken) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData, {
        headers: {
          Authorization: `${authToken}`,
          'Content-Type': 'application/json', // Specify the content type if needed
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  updateTask: async (taskId, taskData,authToken) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
        headers: {
          Authorization: `${authToken}`,
          'Content-Type': 'application/json', // Specify the content type if needed
        }});
      return response;
    } catch (error) {
      throw error;
    }
  },

  deleteTask: async (taskId, authToken) => {
    try {
      const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
        headers: {
          Authorization: `${authToken}`,
          'Content-Type': 'application/json', // Specify the content type if needed
        }});
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;
