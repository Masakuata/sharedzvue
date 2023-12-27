// store.js
import { defineStore } from 'pinia';

export const useMyStore = defineStore('miStore', {
    // Estado del store
    state: () => {
        return {
            loggedIn: false,
            sidebarStore: false,
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
        },
        toggleSidebarStore() {
            console.log('Toggling sidebar en la store', this.sidebarStore);
            this.sidebarStore = !this.sidebarStore;
        }
    },
    // Getters
    getters: {
        isLoggedIn() {
            return this.loggedIn;
        }
    }
});
