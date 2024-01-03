<template>
    <button @click="onClick" :disabled="isLoading" :class="{
        'w-full bg-white h-12 rounded-lg text-bgBlue font-semibold text-lg flex justify-center items-center': isWhite,
        'w-full bg-bgBlue h-12 rounded-lg text-white font-semibold text-lg flex justify-center items-center': isBlue,
        'w-full bg-red-500 h-12 rounded-lg text-white font-semibold text-lg flex justify-center items-center': isRed,
        'w-full bg-green-500 h-12 rounded-lg text-white font-semibold text-lg flex justify-center items-center': isGreen,
        'w-full bg-bgPurple h-12 rounded-lg text-white font-semibold text-lg flex justify-center items-center': isPurple,
    }">
        <span v-if="isLoading">
            <LoadingIcon></LoadingIcon>
        </span>

        <span v-else>
            <slot></slot>
        </span>
    </button>
</template>
  
<script setup>
import { defineProps, onMounted, ref } from 'vue';
import LoadingIcon from '@/components/utilities/LoadingIcon.vue';


const isBlue = ref(false);
const isRed = ref(false);
const isGreen = ref(false);
const isWhite = ref(false);
const isPurple = ref(false);

const props = defineProps({
    isLoading: Boolean,
    color: String,
});



onMounted(() => {
    switch (props.color) {
        case 'blue':
            isBlue.value = true;
            break;
        case 'red':
            isRed.value = true;
            break;
        case 'green':
            isGreen.value = true;
            break;
        case 'purple':
            isPurple.value = true;
            break;
        default:
            isWhite.value = true;
            break;
    }
});

</script>
  