<template>
    <div class="w-full">
        <div class="w-full">
            <p class="text-2xl font-semibold text-center text-[#BA1A1A]">{{ message }}</p>
            <div class="w-full flex justify-center mt-2">
                <svg width="100" height="100" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_267_141" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="300"
                        height="300">
                        <rect width="300" height="300" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_267_141)">
                        <path
                            d="M150 212.5C153.542 212.5 156.51 211.302 158.906 208.906C161.302 206.51 162.5 203.542 162.5 200C162.5 196.458 161.302 193.49 158.906 191.094C156.51 188.698 153.542 187.5 150 187.5C146.458 187.5 143.49 188.698 141.094 191.094C138.698 193.49 137.5 196.458 137.5 200C137.5 203.542 138.698 206.51 141.094 208.906C143.49 211.302 146.458 212.5 150 212.5ZM137.5 162.5H162.5V87.5H137.5V162.5ZM150 275C132.708 275 116.458 271.719 101.25 265.156C86.0417 258.594 72.8125 249.688 61.5625 238.438C50.3125 227.188 41.4062 213.958 34.8438 198.75C28.2812 183.542 25 167.292 25 150C25 132.708 28.2812 116.458 34.8438 101.25C41.4062 86.0417 50.3125 72.8125 61.5625 61.5625C72.8125 50.3125 86.0417 41.4062 101.25 34.8438C116.458 28.2812 132.708 25 150 25C167.292 25 183.542 28.2812 198.75 34.8438C213.958 41.4062 227.188 50.3125 238.438 61.5625C249.688 72.8125 258.594 86.0417 265.156 101.25C271.719 116.458 275 132.708 275 150C275 167.292 271.719 183.542 265.156 198.75C258.594 213.958 249.688 227.188 238.438 238.438C227.188 249.688 213.958 258.594 198.75 265.156C183.542 271.719 167.292 275 150 275ZM150 250C177.917 250 201.562 240.312 220.938 220.938C240.312 201.562 250 177.917 250 150C250 122.083 240.312 98.4375 220.938 79.0625C201.562 59.6875 177.917 50 150 50C122.083 50 98.4375 59.6875 79.0625 79.0625C59.6875 98.4375 50 122.083 50 150C50 177.917 59.6875 201.562 79.0625 220.938C98.4375 240.312 122.083 250 150 250Z"
                            fill="#BA1A1A" />
                    </g>
                </svg>

            </div>
            <div class="p-2 w-full">
                <ButtonX color="redLite" @click="emitirAceptar">{{ buttonMessage }}</ButtonX>
            </div>

        </div>


    </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import ButtonX from './ButtonX.vue';
const props = defineProps({
    message: {
        type: String,
        default: 'Error...!'
    },
    buttonMessage: {
        type: String,
        default: 'Aceptar'
    }
});

const emit = defineEmits(['aceptar']);

const emitirAceptar = () => {
    emit('aceptar');
}


</script>