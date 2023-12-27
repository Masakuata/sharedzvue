<template>
<div class=" flex flex-row bg-gray-200 rounded-xl w-full h-fit mt-3 p-3">
    <div class="flex w-1/3 items-center justify-center">
        <img src="@/assets/dog-icon.svg" alt="Descripción de la imagen" style="width: 60px; height: auto;" />
    </div>
    <div class="flex flex-col w-full">
        <p>Purina Ganador, Bulldog</p>
        <p>Paquete de 6 pzas</p>
        <p>Stock: 10</p>
        <p class="text-bgBlue">500$</p>
        
    </div>
</div>



</template>
<script setup>

const props = defineProps({
    nombre: String,
    presentacion: String,
    tipoMascota: Number,
    raza: Number,
    precio: String
})

</script>