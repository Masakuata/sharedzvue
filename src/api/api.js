import axios from 'axios';


const urlEdson = 'https://neutral-kindly-wildcat.ngrok-free.app'
const url = 'http://clayrite.ddns.net:81'
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

    try { 
        let respuesta = await axios.post(urlnew, user);
        let respuestaJson =  respuesta.json
        console.log('RespuestaJson:', respuestaJson);
        //let token = respuestaJson.headers.get('Token')
        console.log('La respuesta es', respuestaJson);
        //console.log('El token es', token);
        return respuesta  
    } catch (error) {
        throw error;
    }
}