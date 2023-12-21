<template>
    <button @click="handleClick" :disabled="isLoading"
        class="w-full bg-primaryBlue h-12 rounded-lg text-white font-semibold text-lg flex justify-center items-center">
        <span v-if="isLoading">
            <LoadingIcon></LoadingIcon>
        </span>

        <span v-else>{{ text }}</span>
    </button>
</template>
  
<script setup>
import { defineProps} from 'vue';
import LoadingIcon from '@/components/utilities/LoadingIcon.vue';

const props = defineProps({
    text: String,
    isLoading: Boolean,
    onClick: Function
});

const handleClick = () => {
    if (props.onClick && !props.isLoading) {
        props.onClick();
    }
};
</script>
  