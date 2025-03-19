<template>
    <div class="card flex justify-center">
        <!-- Toast for success message -->
        <Toast />

        <!-- Button to Show Dialog -->
        <Button label="Show" @click="visible = true" />

        <!-- Dialog Modal -->
        <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
            <span>Update your information.</span>

            <form @submit.prevent="saveData"> <!-- prevent page from reloading-->
                <!-- Name Input -->
                <div>
                    <label for="name">Name</label>
                    <InputText id="name" v-model="name" autocomplete="off" @blur="validateName" />
                </div>
                <p v-if="nameError" class="error">{{ nameError }}</p>

                <!-- Email Input -->
                <div>
                    <label for="email">Email</label>
                    <InputText id="email" v-model="email" autocomplete="off" @blur="validateEmail" />
                </div>
                <p v-if="emailError" class="error">{{ emailError }}</p>

                <!-- Pincode Input -->
                <div>
                    <label for="pincode">Pincode</label>
                    <InputText id="pincode" v-model="pincode" autocomplete="off" @blur="validatePincode" />
                </div>
                <p v-if="pincodeError" class="error">{{ pincodeError }}</p>

                <!-- Buttons -->
                <div>
                    <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                    <Button type="submit" label="Save" :disabled="!isFormValid" />
                </div>
            </form>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";

const visible = ref(false);
const name = ref('');
const email = ref('');
const pincode = ref('');

const nameError = ref('');
const emailError = ref('');
const pincodeError = ref('');

const toast = useToast(); // Initialize PrimeVue Toast

// Validate Name (Should be non-empty)
const validateName = () => {
    nameError.value = name.value.trim().length > 0 ? '' : 'Name cannot be empty';
};

// Validate Email (Should be in correct format)
const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    emailError.value = emailRegex.test(email.value) ? '' : 'Invalid email format';
};

// Validate Pincode (Should be a 6-digit integer)
const validatePincode = () => {
    const pincodeRegex = /^\d{6}$/;
    pincodeError.value = pincodeRegex.test(pincode.value) ? '' : 'Pincode must be a 6-digit number';
};

// Check if the form is valid
const isFormValid = computed(() => {
    return !nameError.value && !emailError.value && !pincodeError.value &&
        name.value.trim() !== '' && email.value.trim() !== '' && pincode.value.trim() !== '';
});

// Save Data (Only if the form is valid)
const saveData = () => {
    validateName();
    validateEmail();
    validatePincode();

    if (!isFormValid.value) return;

    console.log("User Data:", {
        Name: name.value,
        Email: email.value,
        Pincode: pincode.value
    });

    // Show success message
    toast.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully!', life: 3000 });

    // Close the dialog after saving
    visible.value = false;
};
</script>

<style scoped>
.error {
    color: red;
    font-size: 14px;
    margin-left: 100px;
}
</style>
