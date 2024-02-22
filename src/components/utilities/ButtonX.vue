<template>
    <button @click="onClick" :disabled="isLoading" :class="[{
        'w-full bg-white rounded-lg text-bgBlue font-semibold text-lg flex justify-center items-center': isWhite,
        'w-full bg-bgBlue rounded-lg text-white font-semibold text-lg flex justify-center items-center': isBlue,
        'w-full bg-colorCancel rounded-lg text-white font-semibold text-lg flex justify-center items-center': isRed,
        'w-full bg-bgGreen rounded-lg text-white font-semibold text-lg flex justify-center items-center': isGreen,
        'w-full bg-bgPurple  rounded-lg text-white font-semibold text-lg flex justify-center items-center': isPurple,
        'w-full bg-[#FFDAD6] rounded-lg text-[#410002] font-semibold text-lg flex justify-center items-center': isRedLite,

    }, { 'h-9': props.isSlim }, { 'h-12': !props.isSlim }]">
        <span v-if="isLoading">
            <LoadingIcon></LoadingIcon>
        </span>
        <template v-else>
            <svg v-if="props.icon === 'add'" class="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd" />
            </svg>
            <svg v-else-if="props.icon === 'print'"  class="lucide lucide-printer w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                >
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect width="12" height="8" x="6" y="14" />
            </svg>
            <span>
                <slot></slot>
            </span>
        </template>

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
const isRedLite = ref(false);

const props = defineProps({
    isLoading: Boolean,
    color: String,
    icon: {
        type: String,
        default: 'none',
    },
    isSlim: {
        type: Boolean,
        default: false,
    },

});



onMounted(() => {
    switch (props.color) {
        case 'redLite':
            isRedLite.value = true;
            break;
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
  