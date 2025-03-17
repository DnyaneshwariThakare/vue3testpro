<template>
    <div>
         <button type="submit" @click="logout">Logout</button>
         <nav>
        <router-link to="/app/home">Home</router-link>
        <router-link to="/app/about">About</router-link>
      </nav>
  
    <router-view />
    </div>
  
    </template>
    <script setup>
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '../store/login';
    const store = useAuthStore();
    const router = useRouter();

const logout = (async () => {
    console.log("Logging out");
    store.logout();
    router.push("/");
});
    </script>
   
   

 