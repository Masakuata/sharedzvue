// store.js
import { defineStore } from 'pinia';

export const useMiStore = defineStore('miStore', {
    // Estado del store
    state: () => {
        return {
            loggedIn: false,
        };
    },
    // Acciones
    actions: {
        login() {
            this.loggedIn = true;
        },
        logout() {
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
