<template>
  <div>
    <div class="relative">
      <input :type="showPassword ? 'text' : 'password'"
        class="w-full mt-1 h-10 px-3 border border-solid border-blueLetters rounded-lg" v-model="password"
        placeholder="Contraseña">
      <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        @click="showPassword = !showPassword">
        <template v-if="showPassword">
          <img src="@/assets/eye.svg" class="h-6 w-6" alt="Toggle password visibility">
        </template>
        <template v-else>
          <img src="@/assets/eye-off.svg" class="h-6 w-6" alt="Toggle password visibility">
        </template>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const password = ref('');
const showPassword = ref(false);
</script>
