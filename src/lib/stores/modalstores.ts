import { writable } from "svelte/store";

const initialState = {
  isShown: false,
  title: '',
  message: '',
  component: null
}

export const modalStore = writable(initialState);

export function showModal(title:string, message:string, component = null) {
  modalStore.update(state => ({...state, isShown: true, title, message, component}));
}

export function hideModal() {
  modalStore.update(state => ({...state, isShown: false, title: '', message: '', component: null}));
}


export const initialDrawer = {
    isShown: false,
    component: null
}

export const drawerStore = writable(initialDrawer)

export function showDrawer( component = null ) {
    drawerStore.update(state => ({ ...state, isShown: true, component}));
}

export function hideDrawer(){
    drawerStore.update(state => ({...state, isShown: false, component: null}))
}

export const audioStore = writable(null);


const initialToast = {
  isShown: false,
  title: '',
  message: '',
}

export const toastStore = writable(initialToast);

export function showToast(title:string, message:string) {
  toastStore.update(state => ({...state, isShown: true, title, message}));
}

export function hideToast() {
  toastStore.update(state => ({...state, isShown: false, title: '', message: ''}));
}