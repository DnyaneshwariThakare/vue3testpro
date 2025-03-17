<template>
    <div>
        <h1>About Page</h1>
        <p>This is the about page.</p>
        <router-view />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { apiCall, apiCallpost } from '../plugins/testAxios';

onMounted(() => {
    const apiRequests = [
        {
            url: '/api/test',

            headers: {}
        },];
    // Define your dynamic API calls
    const apiPostRequests = [

        {
            url: '/servercppr',
            payload: { "filter": "%", "placementAgencyId": 5 },
            activityName: 'FetchRecruiterList'
        },
        {
            url: '/servercppo',
            payload: { "userName": "13210041", "password": "13210041" },
            activityName: 'logintest'
        },
        {
            url: '/serverlms',
            payload: { "roleApplicableTo": ["School"] },
            activityName: 'FetchRolesByClientId'
        },
        {
            url: '/locationApi',
            payload: { "countryId": 113 },
            activityName: 'FetchAllStates'
        }
    ];

    // Call each API dynamically
    apiPostRequests.forEach(({ url, activityName, payload }) => {
        apiCallpost(url, activityName, payload);
    });
    apiRequests.forEach(({ url, headers }) => {
        apiCall(url, { headers });
    });
});
</script>

<style scoped>
h1 {
    color: #35495e;
}
</style>
