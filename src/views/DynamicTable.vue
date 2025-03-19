<!-- components/DynamicTable.vue -->
<template>
    <div>
        <!-- <Button label="Export to Excel" @click="exportToExcel" class="p-button-success mb-3" /> -->

        <DataTable :value="data" :paginator="true" :lazy="true" :rows="rowsPerPage" :totalRecords="totalRecords"
            :first="offset" :rowsPerPageOptions="[5, 10, 20, 50, 100, 200]" @page="onPageChange"
            tableStyle="min-width: 50rem">
            <Column header="Sr. No">
                <template #body="slotProps">
                    {{ offset + data.indexOf(slotProps.data) + 1 }}
                </template>
            </Column>

            <Column v-for="(value, key) in (data[0] || {})" :key="key" :field="key" :header="camelCaseToSpaces(key)">
                <template #body="slotProps">
                    <template v-if="isFilePath(key, slotProps.data[key])">
                        <Button icon="pi pi-eye" class="p-button-text p-button-info"
                            @click="downloadFile(slotProps.data[key])" />
                    </template>
                    <template v-else>
                        {{ slotProps.data[key] }}
                    </template>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import * as XLSX from "xlsx";


const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
    totalRecords: {
        type: Number,
        required: true,
    },
    rowsPerPage: {
        type: Number,
        default: 10,
    },
    offset: {
        type: Number,
        default: 0,
    },
});

const emit = defineEmits(["updatePage"]);

// ✅ Convert camelCase to human-readable text
const camelCaseToSpaces = (camelCaseStr) => {
    return camelCaseStr.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (str) => str.toUpperCase());
};

// ✅ Check if a column contains a file path
const isFilePath = (key, value) => {
    return key.toLowerCase().includes("path") || key.toLowerCase().includes("file");
};

// ✅ Download file from a given path
const downloadFile = (filePath) => {
    if (!filePath) return;
    const fullPath = `${window.location.origin}/cdnserver${filePath}`;
    const link = document.createElement("a");
    link.href = fullPath;
    link.download = filePath.split("/").pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// ✅ Handle page change event
const onPageChange = (event) => {
    emit("updatePage", event.first, event.rows);
};

// ✅ Export data to Excel
// const exportToExcel = () => {
//     if (!props.data.length) return;

//     const columns = Object.keys(props.data[0]);
//     const data = props.data.map((item, index) => {
//         const row = { "SR No": props.offset + index + 1 };
//         columns.forEach((col) => {
//             row[col] = item[col];
//         });
//         return row;
//     });

//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

//     XLSX.writeFile(workbook, "Report.xlsx");
// };
</script>