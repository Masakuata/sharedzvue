import {useMyStore} from '@/stores/store.js';

const {toggleSidebarStore} = useMyStore();

export function toggleSidebar() {
    toggleSidebarStore();
}