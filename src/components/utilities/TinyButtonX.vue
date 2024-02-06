<template>
    <div class="flex flex-row rounded-md  w-7 h-7 text-center justify-center items-center shadow-[1px_1px_1px_1px_rgba(60,60,60,0.5)] bg-bgPurple ">
        <template v-if="type === 'edit'">
            <svg class="h-5 w-5" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M5.5 40.5H9.0625L33.5 16.0625L29.9375 12.5L5.5 36.9375V40.5ZM0.5 45.5V34.875L33.5 1.9375C34 1.47917 34.5521 1.125 35.1562 0.875C35.7604 0.625 36.3958 0.5 37.0625 0.5C37.7292 0.5 38.375 0.625 39 0.875C39.625 1.125 40.1667 1.5 40.625 2L44.0625 5.5C44.5625 5.95833 44.9271 6.5 45.1563 7.125C45.3854 7.75 45.5 8.375 45.5 9C45.5 9.66667 45.3854 10.3021 45.1563 10.9062C44.9271 11.5104 44.5625 12.0625 44.0625 12.5625L11.125 45.5H0.5ZM31.6875 14.3125L29.9375 12.5L33.5 16.0625L31.6875 14.3125Z"
                    fill="white" />
            </svg>

        </template>
        <template v-else-if="type === 'delete'">
            <svg class="h-5 w-5" width="34" height="38" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.58325 37.75C5.43742 37.75 4.45652 37.342 3.64054 36.526C2.82457 35.7101 2.41659 34.7292 2.41659 33.5833V6.5H0.333252V2.33333H10.7499V0.25H23.2499V2.33333H33.6666V6.5H31.5833V33.5833C31.5833 34.7292 31.1753 35.7101 30.3593 36.526C29.5433 37.342 28.5624 37.75 27.4166 37.75H6.58325ZM27.4166 6.5H6.58325V33.5833H27.4166V6.5ZM10.7499 29.4167H14.9166V10.6667H10.7499V29.4167ZM19.0833 29.4167H23.2499V10.6667H19.0833V29.4167Z"
                    fill="white" />
            </svg>
        </template>



    </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'edit',
    },

});
</script>