// store.js
import { defineStore } from 'pinia';

export const useMyStore = defineStore('miStore', {
    // Estado del store
    state: () => {
        return {
            loggedIn: false,
            sidebarStore: false,
            username: 'user',
            email: 'email',
            queryInventory: { query: '', page: -1 },

        };
    },
    // Acciones
    actions: {
        loginStore(username, email) {
            this.username = username;
            this.email = email;
            this.loggedIn = true;
        },
        logoutStore() {
            this.loggedIn = false;
        },
        toggleSidebarStore() {
            this.sidebarStore = !this.sidebarStore;
        },
        setQueryInventory(query) {
            this.queryInventory = query;
        },
        resetQueryInventory() {
            this.queryInventory = { query: '', page: -1 };
        }
    },
    // Getters
    getters: {
        isLoggedIn() {
            return this.loggedIn;
        },
        getQueryInventory() {
            return this.queryInventory;
        }   
    }
});
