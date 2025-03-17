<template>
    <div>
        <h1>Reports</h1>
        <h1>Candidate Wise Undertaking Report</h1>

        <!-- Pass Data & Pagination Props to DynamicTable -->
        <DynamicTable :data="candidates" :totalRecords="totalRecords" :rowsPerPage="limit" :offset="offset"
            @updatePage="handlePageChange" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiCallpost } from "../plugins/testAxios";
import DynamicTable from "./DynamicTable.vue";

// ✅ Data Variables
const candidates = ref([]);
const totalRecords = ref(0);
const limit = ref(10);
const offset = ref(0);
const loading = ref(false);

// ✅ Fetch total record count
const countOfCandidates = async () => {
    try {
        const activityName = "CountOfCandidateWiseUndertakingReport";
        const payload = { filterString: "%", limit: "100000", offset: "0", purpose: "CSMS-DEEP" };

        const response = await apiCallpost("/servercppo", activityName, payload);
        if (response?.CountOfCandidateWiseUndertakingReport?.result) {
            totalRecords.value = response.CountOfCandidateWiseUndertakingReport.result.totalCount;
        }
    } catch (error) {
        console.error("Error fetching count:", error);
    }
};

// ✅ Fetch paginated data
const getCandidates = async () => {
    loading.value = true;
    try {
        const activityName = "CandidateWiseUndertakingReport";
        const payload = { filterString: "%", limit: limit.value.toString(), offset: offset.value.toString(), purpose: "CSMS-DEEP" };

        const response = await apiCallpost("/servercppo", activityName, payload);
        if (response?.CandidateWiseUndertakingReport?.result) {
            candidates.value = response.CandidateWiseUndertakingReport.result;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        loading.value = false;
    }
};

// ✅ Handle page change
const handlePageChange = (newOffset, newLimit) => {
    offset.value = newOffset;
    limit.value = newLimit;
    getCandidates();
};

// ✅ Fetch initial data on mount
onMounted(async () => {
    await countOfCandidates();
    await getCandidates();
});
</script>
