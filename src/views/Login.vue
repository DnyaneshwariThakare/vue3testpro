<template>
    <div>
        <Card>
            <template #title>Login</template>
            <template #content>
                <form @submit.prevent="handleLogin">
                    <!-- <div>
                        <label for="email">Email:</label>
                        <InputText id="email" v-model="email" required type="email" @blur="validateEmail" />
                        <p v-if="emailError" class="error">{{ emailError }}</p>
                    </div> -->

                    <div>
                        <label for="username">Username:</label>
                        <InputText id="username" v-model="username" required @blur="validateUsername" />
                        <p v-if="usernameError" class="error">{{ usernameError }}</p>
                    </div>

                    <div>
                        <label for="password">Password:</label>
                        <Password id="password" v-model="password" required toggleMask @input="validatePassword" />
                        <p v-if="passwordError" class="error">{{ passwordError }}</p>
                    </div>

                    <Button type="submit" label="Login" icon="pi pi-sign-in" :disabled="!isFormValid" />

                    <p v-if="store.loginError" class="error">{{ store.loginError }}</p>
                </form>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '../store/login';
import { useRouter } from "vue-router";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Card from "primevue/card";

const store = useAuthStore();
const router = useRouter();

// const email = ref('');
const username = ref('');
const password = ref('');

// const emailError = ref('');
const usernameError = ref('');
const passwordError = ref('');

// const validateEmail = () => {
//     emailError.value = email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ? '' : 'Invalid email format';
// };

const validateUsername = () => {
    usernameError.value = username.value.length >= 3 ? '' : 'Username must be at least 3 characters';
};

const validatePassword = () => {
    passwordError.value = password.value.length >= 6 ? '' : 'Password must be at least 6 characters';
};

const isFormValid = computed(() => {
    // return email.value && !emailError.value 
    return username.value && password.value && !usernameError.value && !passwordError.value;
});

const handleLogin = async () => {
    // validateEmail();
    validateUsername();
    validatePassword();

    if (!isFormValid.value) return;

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
