<template>
    <div class="p-4 space-y-4">
        <div class="flex flex-row items-center space-x-4">
            <div class=" flex flex-col w-1/2">
                <input type="file" @change="handleFileUpload" class="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                 file:rounded-full file:border-0 file:text-sm file:font-semibold
                 file:bg-blue-50 file:text-bgBlue hover:file:bg-violet-100" />

                <div v-if="fileName" class="text-sm text-gray-700 w-full text-center mt-3">
                    {{ fileName }}
                </div>
            </div>


            <div v-if="imageData" class="flex-shrink-0">
                <img :src="imageData" class="object-contain h-40 w-40  rounded-lg shadow-md" />
            </div>
            <div class="bg-white flex-shrink-0" v-else>
                <img v-if="imageUrl" :src="imageUrl" class="object-contain h-40 w-40  rounded-lg shadow-md" />
                <svg v-else class="w-40 h-40" width="200" height="200" viewBox="0 0 200 200" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_254_273" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="200"
                        height="200">
                        <rect width="200" height="200" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_254_273)">
                        <path
                            d="M41.6667 175C37.0833 175 33.1597 173.368 29.8958 170.104C26.6319 166.84 25 162.917 25 158.333V41.6667C25 37.0833 26.6319 33.1597 29.8958 29.8958C33.1597 26.6319 37.0833 25 41.6667 25H158.333C162.917 25 166.84 26.6319 170.104 29.8958C173.368 33.1597 175 37.0833 175 41.6667V158.333C175 162.917 173.368 166.84 170.104 170.104C166.84 173.368 162.917 175 158.333 175H41.6667ZM50 104.792L83.3333 71.4583L116.667 104.792L150 71.4583L158.333 79.7917V41.6667H41.6667V96.4583L50 104.792ZM41.6667 158.333H158.333V103.333L150 95L116.667 128.333L83.3333 95L50 128.333L41.6667 120V158.333ZM41.6667 158.333V103.333V120V41.6667V158.333Z"
                            fill="#1C1B1F" />
                    </g>
                </svg>
            </div>


        </div>

    </div>
</template>
  
<script setup>
import { ref, defineEmits, defineProps } from 'vue';

const props = defineProps({
    imageUrl: {
        type: String,
        default: null
    },

});









const imageData = ref('');
const fileName = ref('');
let fileG = null;

const emit = defineEmits(['setImage']);

const handleFileUpload = (event) => {
    fileG = event.target.files[0];

    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        fileName.value = file.name; // Guardar el nombre del archivo
        const reader = new FileReader();
        reader.onload = (e) => {
            imageData.value = e.target.result; // Guardar la imagen como un Data URL para la vista previa
        };
        reader.readAsDataURL(file);
        emit('setImage', file);
    } else {
        imageData.value = '';
        fileName.value = ''; // Restablecer el nombre si no se selecciona un archivo de imagen
    }
};


</script>
  