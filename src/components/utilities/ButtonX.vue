<template>
    <button @click="onClick" :disabled="isLoading"
        class="w-full bg-white h-12 rounded-lg text-bgBlue font-semibold text-lg flex justify-center items-center">
        <span v-if="isLoading">
            <LoadingIcon></LoadingIcon>
        </span>

        <span v-else>
            <slot></slot>
        </span>
    </button>
</template>
  
<script setup>
import { defineProps} from 'vue';
import LoadingIcon from '@/components/utilities/LoadingIcon.vue';

const props = defineProps({
    isLoading: Boolean,
});


</script>
  