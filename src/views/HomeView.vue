<template>

  <div class="flex flex-col items-center px-5 md:flex-row md:items-center md:h-screen">

    <div class="w-full h-96 mt-5 bg-blue-300 rounded-lg mx-1 p-5  md:w-1/2 md:mx-10 md:h-96">
      <p class="text-lg font-semibold text-white">Hola, somos una pagina que te ayudara a organizar tus gastos mejor en tus eventos con tus amigos.
         Nos interesa que los pagos sean justos y que nadie pague de mas.
         Con nuestra pagina podras organizar tus eventos y llevar un control de los gastos que se generen en el.
         Podras saber quien pago que y cuanto, y quien debe pagarle a quien.
         Tambien podras saber cuanto dinero se ha gastado en total y cuanto le debe cada uno a los demas.
         Esperamos que te guste nuestra pagina y que te sea de mucha ayuda.   
      </p>
    </div>
    <div class="w-full h-96 mt-5 bg-blue-300 rounded-lg mx-1  md:w-1/2 md:mx-10 md:h-96">Hola</div>
    

  </div>

 

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavbarWelcome from '@/components/nav/NavbarWelcome.vue';
import NavBarExample from '@/components/nav/NavBarExample.vue';


const loading = ref(true);
const router = useRouter();

//funcion para hacer un conteo de 5 segundos y desaparecer el loading
const cargar = () => {
  loading.value = true;
  setTimeout(() => {
    irLogin();
  }, 5000);
};

const irLogin = () => {
  console.log('irLogin');
  loading.value = false;
  router.push({ name: 'login' });
};

onMounted(() => {
  //cargar();
});

</script>

