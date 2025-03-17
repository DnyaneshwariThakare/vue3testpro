<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      
      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit">Login</button>

      <p v-if="store.loginError" class="error">{{ store.loginError }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect ,onMounted} from 'vue';
import { useAuthStore } from '../store/login';
import { useRouter } from "vue-router";

const store = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');

const handleLogin = async () => {
 
  console.log("Logging in with:", username.value, password.value);

  const success = await store.login(username.value, password.value);
  
  if (success) {
    console.log("Token in sessionStorage:", sessionStorage.getItem("auth_token"));
    router.push("/app/home");
  } else {
    console.error("Login failed");
  }
};
onMounted(() => {
   store.logout();
  console.log("Login Page Mounted");
});

</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
</style>
