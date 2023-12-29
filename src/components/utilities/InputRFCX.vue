<template>
    <div class="w-full">
        <label for="rfc" class="block text-sm font-medium text-bgBlue">RFC</label>
        <input id="rfc" v-model="rfc" @input="validateRFC" maxlength="13"
            class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" />
        <template v-if="rfc.length > 0">
            <p class="text-green-600" v-if="rfcValid">RFC válido</p>
            <p v-else class="text-red-600">Ingresa un RFC valido</p>
        </template>
        <p v-else-if="faltaRfc" class="text-red-600">El RFC es un campo requerido</p>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';


const rfc = ref('');
const rfcValid = ref(false);
const faltaRfc = ref(false);

</script>