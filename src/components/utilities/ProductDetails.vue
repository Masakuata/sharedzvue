<template>
    <p class="w-full text-lg font-semibold text-left ml-3">Detalles del producto</p>
    <div class="w-full flex flex-row   py-3">
        
        <div class="w-5/12 bg-white rounded-lg md:p-3">
            <template v-if="!imageUrl">
                <svg class="w-full h-auto md:h-20 md:w-20 " width="400" height="400" viewBox="0 0 200 200" fill="none"
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
            </template>
            <template v-else>
                <img :src="imageUrl" class="object-contain h-40 w-full md:h-40 md:w-auto  rounded-lg shadow-md" />
            </template>
        </div>
        <div class="flex flex-col px-3 w-7/12 overflow-scroll">
            <template v-if="producto">

                <div class="flex flex-row">
                    <p class="font-semibold">{{ producto.nombre }}</p>
                </div>
                <div class="flex flex-row">
                    <p>{{ producto.presentacion }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="mr-2">Peso:</p>
                    <p>{{ producto.peso + ' KG' }}</p>
                </div>
                <div class="flex flex-row">
                    <p class="mr-2">Disponibilidad:</p>
                    <p class="text-green-600"
                        :class="{ 'text-green-600': producto.cantidad > 0, 'text-red-600': producto.cantidad <= 0 }">{{
                            producto.cantidad }}</p>
                </div>
                <div class="flex flex-col w-full">
                    <div v-for="precio in producto.precios" class="flex flex-row">
                        <p class="mr-2">{{ precio.tipoCliente }}:</p>
                        <p>{{ '$' + precio.precio }}</p>
                    </div>
                </div>





            </template>


        </div>
    </div>
    <template v-if="producto">
        <div class="flex flex-row">
            <p class="text-2xl  text-right mt-4 font-medium w-full">{{ producto.nombrePrecio + ' $' + producto.precio }}</p>
        </div>
    </template>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import { storage } from '@/firebase.js';
import { ref as storageRef, getDownloadURL } from 'firebase/storage'


const loading = ref(false);

const precios = ref(null);

const props = defineProps({
    producto: Object,
});
const imageUrl = ref(null);

const getImageUrl = () => {

    const path = process.env.VUE_APP_FIREBASE_PATH + props.producto.id + '.png';

    getDownloadURL(storageRef(storage, path))
        .then((url) => {
            imageUrl.value = url;

        })
        .catch((error) => {
        });
};

watch(() => props.producto, () => {
    getImageUrl();
});


onMounted(() => {
    if (props.producto) {
        getImageUrl();
    }
});


</script>