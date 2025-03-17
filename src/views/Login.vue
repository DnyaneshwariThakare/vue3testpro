<template>
    <div>
        <Card>
            <template #title>Login</template>
            <template #content>
                <form @submit.prevent="handleLogin">
                    <div>
                        <label for="username">Username:</label>
                        <InputText id="username" v-model="username" required />
                    </div>

                    <div>
                        <label for="password">Password:</label>
                        <Password id="password" v-model="password" required toggleMask />
                    </div>

                    <Button type="submit" label="Login" icon="pi pi-sign-in" />

                    <p v-if="store.loginError" class="error">{{ store.loginError }}</p>
                </form>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../store/login';
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Card from "primevue/card";

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

}
</style>
