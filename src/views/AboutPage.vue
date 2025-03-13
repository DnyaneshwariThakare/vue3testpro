<template>
    <div>
        <h1>About Page</h1>
        <p>This is the about page.</p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'; // Corrected import statement
import * as testAxios from '../plugins/testAxios'; // Corrected import statement

// import MQL from '../plugins/mql';
// const method = () => {
//     console.log("inside method")
//     new MQL()
//         .setActivity("o.[RoleWiseUndertakingCount]")
//         .setData({ "limit": "10", "offset": "10" })
//         .fetch()
//         .then(rs => {
//             let res = rs.getActivity("RoleWiseUndertakingCount", true)
//             if (rs.isValid("RoleWiseUndertakingCount")) {
//                 console.log("result of method ::", res)
//             } else {
//                 rs.showErrorToast("RoleWiseUndertakingCount")
//             }
//         })
// }



onMounted(() => {
    // method();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'service-header': 'FetchAllStates' // Ensure this matches EXACTLY what backend expects
        }
    }

    const payload =
    {
        "FetchAllStates": {
            "countryId": 113
        }

    };

    const configr = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VySWRfMzIxMiIsImdyb3VwcyI6W10sImNsaWVudElQIjoiIiwiaGl0c0NvdW50IjowLCJ0b2tlbiI6IiIsIm1ldGFkYXRhIjoie1widXNlck5hbWVcIjp7XCJUeXBlXCI6MyxcIlJhd1wiOlwiXFxcInJhaWdhZF9tZ210XFxcIlwiLFwiU3RyXCI6XCJyYWlnYWRfbWdtdFwiLFwiTnVtXCI6MCxcIkluZGV4XCI6MjUzLFwiSW5kZXhlc1wiOm51bGx9LFwidXNlcklkXCI6e1wiVHlwZVwiOjMsXCJSYXdcIjpcIlxcXCIzMjEyXFxcIlwiLFwiU3RyXCI6XCIzMjEyXCIsXCJOdW1cIjowLFwiSW5kZXhcIjoyMzUsXCJJbmRleGVzXCI6bnVsbH0sXCJ1c2VyUm9sZUlkXCI6e1wiVHlwZVwiOjIsXCJSYXdcIjpcIjEyXCIsXCJTdHJcIjpcIlwiLFwiTnVtXCI6MTIsXCJJbmRleFwiOjI4MCxcIkluZGV4ZXNcIjpudWxsfSxcImxvZ2luSWRcIjp7XCJUeXBlXCI6MixcIlJhd1wiOlwiNDI3NjBcIixcIlN0clwiOlwiXCIsXCJOdW1cIjo0Mjc2MCxcIkluZGV4XCI6MzYsXCJJbmRleGVzXCI6bnVsbH0sXCJsb2dpbkxvZ0lkXCI6MSxcImlkXCI6e1wiVHlwZVwiOjIsXCJSYXdcIjpcIjM4NVwiLFwiU3RyXCI6XCJcIixcIk51bVwiOjM4NSxcIkluZGV4XCI6ODEsXCJJbmRleGVzXCI6bnVsbH19IiwiZXhwIjoxNzQxOTM1OTgwfQ.jbD5kyeodvU7PbEcbC3xng-d378S9KHEVksqNuRakJg',
            'service-header': 'FetchRecruiterList' // Ensure this matches EXACTLY what backend expects
        }
    }

    const payloadr =
    {
        "FetchRecruiterList": {
            "filter": "%",
            "placementAgencyId": 5
        }
    }

    const configo = {
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VySWRfMTYzIiwiZ3JvdXBzIjpbXSwiY2xpZW50SVAiOiIiLCJoaXRzQ291bnQiOjAsInRva2VuIjoiIiwibWV0YWRhdGEiOiJ7XCJ1c2VyTmFtZVwiOntcIlR5cGVcIjozLFwiUmF3XCI6XCJcXFwiMTMyMTAwNDFcXFwiXCIsXCJTdHJcIjpcIjEzMjEwMDQxXCIsXCJOdW1cIjowLFwiSW5kZXhcIjoyNTYsXCJJbmRleGVzXCI6bnVsbH0sXCJ1c2VySWRcIjp7XCJUeXBlXCI6MyxcIlJhd1wiOlwiXFxcIjE2M1xcXCJcIixcIlN0clwiOlwiMTYzXCIsXCJOdW1cIjowLFwiSW5kZXhcIjoyMzksXCJJbmRleGVzXCI6bnVsbH0sXCJ1c2VyUm9sZUlkXCI6e1wiVHlwZVwiOjIsXCJSYXdcIjpcIjNcIixcIlN0clwiOlwiXCIsXCJOdW1cIjozLFwiSW5kZXhcIjoyODAsXCJJbmRleGVzXCI6bnVsbH0sXCJsb2dpbklkXCI6e1wiVHlwZVwiOjIsXCJSYXdcIjpcIjVcIixcIlN0clwiOlwiXCIsXCJOdW1cIjo1LFwiSW5kZXhcIjozOCxcIkluZGV4ZXNcIjpudWxsfSxcImxvZ2luTG9nSWRcIjoxLFwiYWdlbmN5SWRcIjp7XCJUeXBlXCI6MCxcIlJhd1wiOlwiXCIsXCJTdHJcIjpcIlwiLFwiTnVtXCI6MCxcIkluZGV4XCI6MSxcIkluZGV4ZXNcIjpudWxsfX0iLCJleHAiOjE3NDE5MzIxMTV9.IBIuToK57EC4TVwkTVVYrJGoFeREAfaNh4W1Zr-diEg',
            'service-header': 'FetchRolesByClientId' // Ensure this matches EXACTLY what backend expects
        }
    }

    const payloado =
    {
        "FetchRolesByClientId":
        {
            "roleApplicableTo": [
                "School"
            ]
        }

    }

    testAxios.testAxios(payload, config);
    testAxios.testAxios1(payload, config);
    testAxios.testAxiosrcpp(payloadr, configr);
    testAxios.testAxioso(payloado, configo);
})
</script>

<style scoped>
h1 {
    color: #35495e;
}
</style>
