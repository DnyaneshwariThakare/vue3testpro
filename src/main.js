import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Aura from '@primeuix/themes/aura';
import InputText from "primevue/inputtext";
import Dialog from "primevue/dialog";
import ToastService from 'primevue/toastservice';



const app = createApp(App);
app.use(ToastService);
app.use(router);
app.component("Dialog", Dialog);
app.component('InputText', InputText);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(createPinia());
app.mount('#app');

