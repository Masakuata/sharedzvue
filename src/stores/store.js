// store.js
import { defineStore } from 'pinia';

export const useMyStore = defineStore('miStore', {
    // Estado del store
    state: () => {
        return {
            loggedIn: false,
        };
    },
    // Acciones
    actions: {
        loginStore() {
            console.log('Logeando en la store');
            this.loggedIn = true;
        },
        logoutStore() {
            console.log('Deslogeando en la store');
            this.loggedIn = false;
        }
    },
    // Getters
    getters: {
        isLoggedIn() {
            return this.loggedIn;
        }
    }
});
