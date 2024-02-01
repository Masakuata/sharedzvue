import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './index.css'
import Vue3Toast from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import VueTailwindDatepicker from "vue-tailwind-datepicker";

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebaseapp'

const pinia = createPinia()

//const app = createApp(App).use(router).mount('#app')
const app = createApp(App)
app.use(VueFire, {
    // imported above but could also just be created here
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })

app.use(router)
app.use(pinia)
app.component('VueDatePicker', VueDatePicker);
app.use(VueTailwindDatepicker)
app.use(Vue3Toast, {
    hideProgressBar: true,
    autoClose: 500,
    toastStyle: {
        borderRadius: '10px',
        color: '#001D33',
        marginLeft: '10px',
        marginRight: '10px',
    }

});
app.mount('#app')


