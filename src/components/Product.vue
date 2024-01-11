<template>
<div class=" flex flex-row bg-gray-200 rounded-xl w-full h-fit mt-3 p-3">
    <div class="flex w-1/3 items-center justify-center">

        <img  v-if="tipoMascota == 'perro'" src="@/assets/dog-icon.svg" alt="Descripción de la imagen" style="width: 60px; height: auto;" />
        <img v-else src="@/assets/cat-icon.svg" alt="Descripción de la imagen" style="width: 60px; height: auto;" />
    </div>
    <div class="flex flex-col w-full">
        <p>{{ producto.nombre + ' ' + producto.raza }}</p>
        <p>{{ producto.presentacion }}</p>
        <p>{{ 'Stock: ' + producto.cantidad }}</p>
        <p class="text-bgBlue">{{ '$' + producto.precio }}</p>
        
    </div>
</div>

<div class="flex flex-row h-32 w-full items-center rounded-lg shadow-lg bg-gray-50 p-3">
                <div class="w-28 h-28 rounded-lg bg-gray-400"></div>
                <div class="p-2 flex flex-col">
                    <p>Cliente</p>
                    <p>Saldo</p>
                    <p>Monto total</p>
                    <p>Restante</p>
                    <p>Fecha</p>
                </div>
            </div>



</template>
<script setup>

// nombre: String,
// presentacion: String,
// tipoMascota: Number,
// raza: Number,
// precio: String
// cantidad: Number,

const props = defineProps({
    producto: Object
})

</script>