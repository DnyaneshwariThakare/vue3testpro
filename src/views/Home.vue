<template>
    <div>
        <h1>Home Page</h1>
        <p>Welcome to the home page!</p>

        <!-- ✅ Get Report Button -->
        <Button label="Get Report" icon="pi pi-search" @click="getReport" class="p-button-success mb-3" />


    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { apiCallpost } from '../plugins/testAxios';
// import Button from 'primevue/button';
// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';

// ✅ Data Variables
const candidates = ref([]);
const totalRecords = ref(0);
const rowsPerPage = ref(10);
const currentPage = ref(0);
const loading = ref(false);
const isGetReport = ref(false);
const baseUrl = ref("https://your-document-server.com");

// ✅ Columns (Generated Dynamically)
const columnKeys = computed(() => candidates.value.length ? Object.keys(candidates.value[0]) : []);

// ✅ Fetch Initial Record Count
onMounted(async () => {
    const activityName = "CountOfCandidateWiseUndertakingReport";
    const payload = {
        "filterString": "%",
        "limit": "100000",
        "offset": "0",
        "purpose": "CSMS-DEEP"
    };

    const response = await apiCallpost('/servercppo', activityName, payload);
    if (response?.CountOfCandidateWiseUndertakingReport?.result) {
        totalRecords.value = response.CountOfCandidateWiseUndertakingReport.result.totalCount;
    }
});

// ✅ Fetch Data for Table
const getReport = async () => {
    loading.value = true;

    const activityName = "CandidateWiseUndertakingReport";
    const payload = {
        "filterString": "%",
        "limit": rowsPerPage.value.toString(),
        "offset": (currentPage.value * rowsPerPage.value).toString(),
        "purpose": "CSMS-DEEP"
    };

    const response = await apiCallpost('/servercppo', activityName, payload);
    console.log("Response from getReport:", response);

    if (response?.CandidateWiseUndertakingReport?.result) {
        candidates.value = response.CandidateWiseUndertakingReport.result;
        totalRecords.value = response.CandidateWiseUndertakingReport.totalCount || 0;
        isGetReport.value = true;
    }

    loading.value = false;
};


</script>

<style scoped>
h1 {
    color: #42b983;
}

.mb-3 {
    margin-bottom: 1rem;
}
</style>
