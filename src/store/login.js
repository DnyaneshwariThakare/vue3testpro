import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { apiCallpost } from '../plugins/testAxios';

export const useAuthStore = defineStore('auth', () => {
    // State variables
    const user = ref(null);
    const token = ref(sessionStorage.getItem("auth_token") || null);
    const roleId = ref(sessionStorage.getItem("user_role") || null);
    const loginError = ref(null);

    // Login function
    const login = async (username, password) => {
        const payload = { userName: username, password: password };
        const activityName = 'logintest';

        try {
            const response = await apiCallpost('/servercppo', activityName, payload);
            console.log("Login Response:", response);

            if (response?.logintest?.result?.token) {
                const userData = response.logintest.result;
                token.value = userData.token;
                roleId.value = userData.LoggedInuserRoleId;
                user.value = userData;  // Store user data
                // Set in session storage
                sessionStorage.setItem("auth_token", token.value);
                sessionStorage.setItem("user_role", roleId.value);
                sessionStorage.setItem("user", user.value);


                return true; // Login successful
            } else {
                loginError.value = "Invalid credentials";
                return false;
            }
        } catch (error) {
            console.error("Login error:", error);
            loginError.value = "Login failed. Please try again.";
            return false;
        }
    };

    // Logout function
    const logout = () => {
        console.log("Logging out...");
        user.value = null;
        token.value = null;
        roleId.value = null;
        sessionStorage.removeItem("auth_token");
        sessionStorage.removeItem("user_role");
    };

    // ✅ Computed property to check if the user is authenticated
    const isAuthenticated = computed(() => !!token.value);

    return { user, token, roleId, loginError, login, logout, isAuthenticated };
}, {
    persist: true // Enable persistence if using pinia-plugin-persistedstate
});
