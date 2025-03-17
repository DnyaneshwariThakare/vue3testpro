import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);

app.use(createPinia());
app.mount('#app');

