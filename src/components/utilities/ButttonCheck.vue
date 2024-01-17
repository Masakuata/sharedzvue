<template>
    <div class="flex flex-row w-full h-10  items-center bg-blueLetters rounded-lg px-2 mt-2"
        @click="togleFiniquitarRestante">
        <div class="w-3/4">
            <label class="text-white mr-10 text-xl" for="checkbox">Finiquitar restante</label>
        </div>
        <div class="w-1/4 flex flex-row  justify-end">
            <input type="checkbox" v-model="finiquitarRestante"
                class="w-6 h-6 text-bgBlue border-gray-300 rounded focus:ring-blue-500" id="checkbox">
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const finiquitarRestante = ref(false);
const togleFiniquitarRestante = () => {
    finiquitarRestante.value = !finiquitarRestante.value;
    emit('finiquitarRestante', finiquitarRestante.value);
};



</script>