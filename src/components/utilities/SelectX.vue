<template>
    <div :class="[{ 'relative': isOpen  }]">

        <div @click="isOpen = !isOpen" class="w-full bg-bgBlue p-1 flex flex-row justify-center text-white font-semibold text-center items-center"
            :class="{ 'rounded-lg': !isOpen, 'rounded-t-lg': isOpen }">

            <template v-if="elementoSeleccionado">
                <p class="mr-2">{{ elementoSeleccionado.text }}</p>
            </template>
            
            <template v-if="!isOpen">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-chevron-down">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
            </template>
            <template v-else>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-chevron-up">
                        <path d="m6 15 6-6 6 6" />
                    </svg>
                </div>
            </template>


        </div>
        <!-- Contenido del desplegable -->
        <div v-show="isOpen" class="absolute  w-full bg-white border-b border-r border-l border-bgBlue shadow-xl rounded max-h-40 overflow-scroll "
            :class="{ 'pb-3': isOpen }">
            <div class="flex flex-col">
                <!-- Iteramos sobre el array de tipos de cliente -->
                <div v-for="elemento in props.elementos" :key="elemento.value"
                    class="py-1 mx-2  cursor-pointer border-b border-gray-600  mt-1" @click="selectItem(elemento)">
                    {{ elemento.text }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits } from 'vue';


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

const seleccionarElemento = () => {
    let pos = 0;
    props.elementos.forEach((elemento, index) => {
        if (elemento.value == props.valueItemSelected) {
            pos = index;
        }
    });

    elementoSeleccionado.value = props.elementos[pos];
    emitirSelectItem();
};



onMounted(() => {
    seleccionarElemento();
});

</script>