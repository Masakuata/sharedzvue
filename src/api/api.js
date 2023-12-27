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
    const complemento = '/usuario';
    let urlnew = getUrl() + complemento;
    let respuesta = {} 

    try { // Reemplaza con tu URL
        console.log('El miembro es', miembro);

        respuesta = await axios.post(urlnew, miembro);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function login(user) {
    const complemento = '/usuario/login';
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
        console.log('Error en login', error);
        throw error;
    }
}