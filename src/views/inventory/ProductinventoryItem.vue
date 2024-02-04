<template>
    <div class="flex flex-row w-full  bg-bgBlue mt-3 rounded-lg overflow-hidden"
        :class="[{ 'h-40': alturaGrande }, { 'h-36': !alturaGrande }]" @click="goEditProduct">
        <div class="w-1/3 bg-bgGray h-full">
            <div class="p-3 h-full w-full">
                <template v-if="!imageUrl">
                    <svg class="w-full h-full" width="200" height="200" viewBox="0 0 200 200" fill="none"
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
                    <img :src="imageUrl" class="object-contain w-full h-full rounded-lg shadow-md bg-white" />
                </template>


            </div>

        </div>
        <div class="flex flex-col w-2/3">
            <div class="flex flex-row h-6 w-full justify-end">
                <div v-if="isDisponible" class="w-20 h-6 bg-blueLight">
                    <p class="font-semibold w-full text-center">In stock</p>
                </div>
                <div v-else class="w-20 h-6 bg-bgRed">
                    <p class="font-semibold w-full text-center">No stock</p>
                </div>
            </div>

            <div class="flex flex-row w-full">
                <p class="text-white font-semibold text-lg ml-3 mr-2  w-44"
                    :class="[{ 'line-clamp-2 overflow-hidden': nombreLargo }]">{{ producto.nombre }}</p>
                <p class="text-white font-semibold text-sm mt-2 mr-2"
                    :class="[{ 'line-clamp-2 overflow-hidden': descripcionLarga }]">{{ producto.presentacion }}</p>
            </div>

            <div class="flex flex-row w-full px-3 pt-3">
                <div class="flex flex-col w-1/2">
                    <p class="text-white font-semibold text-lg ">{{ '$' + producto.precio }}</p>
                    <p class="text-white text-sm">Precio general</p>
                </div>
                <div class="w-1/2">
                    <p class="text-white font-semibold text-lg">{{ producto.cantidad }}</p>
                    <p class="text-white text-sm">Cantidad Stock</p>
                </div>

            </div>
        </div>

    </div>
</template>
<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storage } from '@/firebase.js';
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
const router = useRouter();

const isDisponible = ref(false);
const descripcionLarga = ref(false);
const nombreLargo = ref(false);

const alturaGrande = ref(false);

const props = defineProps({
    producto: Object,
});

const imageUrl = ref('');

const getImageUrl = (id) => {

    console.log('getting url');
    const path = process.env.VUE_APP_FIREBASE_PATH + id + '.png';
    getDownloadURL(storageRef(storage, path))
        .then((url) => {
            imageUrl.value = url;
            console.log('url', url);
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            // const xhr = new XMLHttpRequest();
            // xhr.responseType = 'blob';
            // xhr.onload = (event) => {
            //     const blob = xhr.response;
            // };
            // xhr.open('GET', url);
            // xhr.send();

            // // Or inserted into an <img> element
            // const img = document.getElementById('myimg');
            // img.setAttribute('src', url);
        })
        .catch((error) => {
            console.log('no url');
            // Handle any errors
        });

};


onMounted(() => {
    getImageUrl(props.producto.id);

    if (props.producto.cantidad > 0) {
        isDisponible.value = true;
    }
    if (props.producto.presentacion.length > 6) {
        descripcionLarga.value = true;
        console.log('descripcion larga');
    }
    if (props.producto.nombre.length > 15) {
        nombreLargo.value = true;
    }

    if (descripcionLarga.value || nombreLargo.value) {
        alturaGrande.value = true;
    } else {
        alturaGrande.value = false;
    }

});

const goEditProduct = () => {
    router.push({ name: 'modifystockproduct', params: { id: props.producto.id } });
};



</script>