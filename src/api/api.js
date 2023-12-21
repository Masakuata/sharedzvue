import axios from 'axios';


const urlEdson = 'https://neutral-kindly-wildcat.ngrok-free.app'
const url = 'http://clayrite.ddns.net:80'
const env = 'devn'

function getUrl() {
    if (env === 'dev') {
        return urlEdson
    } else {
        return url
    }
}

export async function registrarUsuario(miembro) {
    const complemento = '/miembro';
    let urlnew = getUrl() + complemento; 

    try { // Reemplaza con tu URL
        const respuesta = await axios.post(urlnew, miembro);
        console.log('Respuesta:', respuesta.data);
        // Manejo de la respuesta
    } catch (error) {
        console.error('Error en la petición POST:', error);
        // Manejo del error
    }
}

export async function login(user) {
    const complemento = '/miembro/login';
    let urlnew = getUrl() + complemento; 

    try { // Reemplaza con tu URL
        const respuesta = await axios.post(urlnew, user);
        console.log('Respuesta:', respuesta.data);
        // Manejo de la respuesta
    } catch (error) {
        console.error('Error en la petición POST:', error);
        // Manejo del error
    }
}