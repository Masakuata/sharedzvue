<template>
    <div :class="[{ 'relative': isOpen }]">

        <div @click="isOpen = !isOpen"
            class="w-full  bg-gray-200 py-1 flex flex-row   text-black font-semibold text-center items-center"
            :class="{ 'rounded-b-lg': !isOpen}">
            
            <template v-if="elementoSeleccionado">
                <div class="flex flex-row justify-end w-1/12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-map-pinned text-black my-1">
                        <path d="M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0" />
                        <circle cx="12" cy="8" r="2" />
                        <path
                            d="M8.835 14H5a1 1 0 0 0-.9.7l-2 6c-.1.1-.1.2-.1.3 0 .6.4 1 1 1h18c.6 0 1-.4 1-1 0-.1 0-.2-.1-.3l-2-6a1 1 0 0 0-.9-.7h-3.835" />
                    </svg>
                </div>

                <p class="w-10/12 text-left ml-3 truncate">{{ elementoSeleccionado.direccion }}</p>
            </template>

            <template v-if="!isOpen">
                <div class="w-1/12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-chevron-down">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
            </template>
            <template v-else>
                <div class="w-1/12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-chevron-up">
                        <path d="m6 15 6-6 6 6" />
                    </svg>
                </div>
            </template>


        </div>
        <!-- Contenido del desplegable -->
        <div v-show="isOpen" class="absolute  w-full bg-gray-200 shadow-xl max-h-40 overflow-scroll "
            :class="{ 'pb-3': isOpen }">
            <div class="flex flex-col">
                <!-- Iteramos sobre el array de tipos de cliente -->
                <div v-for="elemento in props.elementos" :key="elemento.id" class="py-1 mx-2 border-b border-gray-400  cursor-pointer mt-1"
                    @click="selectItem(elemento)">
                    {{ elemento.direccion }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits, onUnmounted } from 'vue';


const elementoSeleccionado = ref(null);

const props = defineProps({
    elementos: Array,
    valueItemSelected: {
        type: Number,
        default: 0
    }
});
const emit = defineEmits(['selectItem']);

const isOpen = ref(false);

const selectItem = (elemento) => {
    isOpen.value = false;
    elementoSeleccionado.value = elemento;
    emitirSelectItem();

};

const emitirSelectItem = () => {
    emit('selectItem', elementoSeleccionado.value);
};

const seleccionarPrimerElemento = () => {
    elementoSeleccionado.value = props.elementos[0];
    emitirSelectItem();
};

const seleccionarElemento = () => {
    let pos = 0;
    props.elementos.forEach((elemento, index) => {
        if (elemento.id == props.valueItemSelected) {
            pos = index;
        }
    });

    elementoSeleccionado.value = props.elementos[pos];
    emitirSelectItem();
};

onUnmounted(() => {
});



onMounted(() => {
    seleccionarPrimerElemento();
    //seleccionarElemento();
});

</script>