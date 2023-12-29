<template>
    <ModalX :is-visible="modalVisible" :is-cancelable="true" @cancel="cancelModal" @confirm="confirmModal">
        <template v-slot:header>El titulo del modal</template>
        El cuerpo del modal
    </ModalX>

    <h1 class="text-white absolute top-0 right-0 mr-2   text-xl font-semibold text-left mt-3">NOTAS</h1>
    <div @click="closeSidebar" class="flex flex-col items-center p-4  w-full h-full md:h-full bg-gray-50">

        <p class="w-full text-xl font-semibold">Cliente</p>
        <SearchX></SearchX>


    </div>
</template>
    
<script setup>
import { ref, onMounted } from 'vue';
import { toggleSidebar } from '@/utils/sidebarManager.js';
import SearchX from '@/components/utilities/SearchX.vue';
import ModalX from '@/components/utilities/ModalX.vue';
import { toast } from 'vue3-toastify';


const modalVisible = ref(false);

const showModal = () => {
    modalVisible.value = true;
};

const cancelModal = () => {
    modalVisible.value = false;
};

const confirmModal = () => {
    modalVisible.value = false;
};

const mostrarToast = () => {

    toast("Nota registrada correctamente", {
        type: 'success',
        autoClose: 500,
    });

};


const closeSidebar = () => {
    toggleSidebar();
};
onMounted(() => {
});

</script>