import axios from 'axios';

// ✅ Reusable function for API calls
const apiCallpost = async (url, activityName, payload) => {
    console.log("Inside testAxios - Activity:", activityName, "Payload:", payload);

    // Ensure the payload is sent correctly
    const finalPayload = { [activityName]: payload };

    // Get token from sessionStorage safely
    const token = sessionStorage.getItem('auth_token') || "";

    if (!token) {
        console.error("No token found in sessionStorage!");
        // return null;
    }

    // ✅ Correct Header Configuration
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            'service-header': activityName  // ✅ Ensure this matches the expected API header
        }
    };

    console.log(`Calling API: ${url}`);

    try {
        const response = await axios.post(url, finalPayload, config);
        console.log('Response:', response.data);
        return response.data;
    } catch (error) {
        console.error(`Error calling ${url}:`, error.response?.data || error.message || error);
        return null;
    }
};

// ✅ GET request function
const apiCall = async (url, method = 'GET', config = {}) => {
    console.log(`Calling API: ${url} with method: ${method}`);

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...config.headers
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetch Response:', data);
        return data;
    } catch (error) {
        console.error(`Error calling ${url}:`, error.message || error);
        return null;
    }
};

export { apiCall, apiCallpost };
