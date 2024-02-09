<template>
    <div class="flex flex-row w-full items-center bg-bgBlue p-2 rounded-lg shadow-lg mt-2">


        <div @click="showDetails" class="flex flex-row w-full">
            <div class="w-2/12 h-20 flex flex-row items-center">
                <template v-if="!imageUrl">
                    <svg class="w-16 h-16" width="400" height="400" viewBox="0 0 200 200" fill="none"
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
                    <img :src="imageUrl" class="object-contain h-16 w-16  rounded-lg shadow-md" />
                </template>
                
            </div>

            <div class="flex flexl-col w-10/12">
                <div class="flex flex-row w-full">
                    <div class="flex flex-col w-11/12 pl-2">
                        <p class="mr-2 w-full truncate text-white text-lg font-semibold">{{ producto.nombre }}</p>
                        <div class="flex flex-row w-full">
                            <p class="mr-2  overflow-hidden text-white text-xs">{{ producto.nombrePrecio }}</p>
                            <p class="mr-2  overflow-hidden text-white text-xs">{{ precioFormat }}</p>
                        </div>
                        
                        <div class="w-full flex flex-row items-center">
                            <p class="w-3/12 text-white text-xs">{{ cantidadFormat }}</p>
                            <p class="w-3/12 text-white text-xs">{{ producto.peso + ' kg' }}</p>
                            <p class="w-6/12 truncate text-white text-right text-lg font-semibold">{{ subtotalFormat }}</p>
                        </div>

                    </div>
                    <div v-if="isDeletable" class="flex flex-row w-7 h-7 shadow-2xl  ">
                        <div @click="unselectItem"
                            class="flex flex-row rounded-md  w-7 h-7 text-center justify-center items-center bg-bgPurple ">
                            <svg class="h-5 w-5 " width="34" height="38" viewBox="0 0 34 38" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.58325 37.75C5.43742 37.75 4.45652 37.342 3.64054 36.526C2.82457 35.7101 2.41659 34.7292 2.41659 33.5833V6.5H0.333252V2.33333H10.7499V0.25H23.2499V2.33333H33.6666V6.5H31.5833V33.5833C31.5833 34.7292 31.1753 35.7101 30.3593 36.526C29.5433 37.342 28.5624 37.75 27.4166 37.75H6.58325ZM27.4166 6.5H6.58325V33.5833H27.4166V6.5ZM10.7499 29.4167H14.9166V10.6667H10.7499V29.4167ZM19.0833 29.4167H23.2499V10.6667H19.0833V29.4167Z"
                                    fill="white" />
                            </svg>

                        </div>
                    </div>
                </div>


            </div>


        </div>


    </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch, defineEmits } from 'vue';
import { storage } from '@/firebase.js';
import { ref as storageRef, getDownloadURL } from 'firebase/storage'
//nombre, presentacion, tipoMascota, raza, precio, canrtidad, id

const cantidadFormat = ref('QTY: 13');
const precioFormat = ref('IUV: $1000');
const subtotalFormat = ref('Subt: $13000');

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



const formatInfo = () => {
    cantidadFormat.value = `QTY: ${props.producto.cantidadCompra}`;
    precioFormat.value = `IUV: $${props.producto.precio}`;
    subtotalFormat.value = `$${props.producto.subtotal}`;
};


const props = defineProps({
    producto: Object,
    isDeletable: Boolean
});
const emit = defineEmits(['unselectItem', 'showDetails']);

const unselectItem = () => {
    emit('unselectItem', props.producto);
};

const calcularSubtotal = () => {
    let subtotalLargo = props.producto.cantidadCompra * props.producto.precio;
    let subtotal = subtotalLargo.toFixed(2);
    let subtotalFloat = parseFloat(subtotal);
    props.producto.subtotal = subtotalFloat;
    formatInfo();
};

const showDetails = () => {
    emit('showDetails', props.producto);
};

watch(
    () => props.producto.cantidadCompra,
    () => {
        calcularSubtotal();
    }
);

watch(
    () => props.producto.precio,
    () => {
        calcularSubtotal();
    }
);


onMounted(() => {
    getImageUrl(props.producto.id);
    formatInfo();

});

</script>