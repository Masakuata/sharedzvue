import axios from 'axios';


const httpsUrl = 'https://petloveback-x7smt.ondigitalocean.app'
const url = 'http://clayrite.ddns.net:81'
const env = 'prod'

function getUrl() {
    if (env === 'prod') {
        return httpsUrl
    } else {
        return url
    }
}


const axiosInstance = axios.create({
    baseURL: getUrl(), // Reemplaza con la URL base de tu API
    headers: {
        'Content-Type': 'application/json',
        // Aquí puedes añadir headers que sean comunes para todas las solicitudes
    }
});

axiosInstance.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers.Token = getToken();
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;



function getToken() {
    return localStorage.getItem('token'); // o de cualquier otra fuente
}

// Intercepta las solicitudes para añadir el token

export async function registrarUsuario(miembro) {
    const complemento = '/usuario';
    let urlnew = getUrl() + complemento;
    let respuesta = {} 

    try { // Reemplaza con tu URL
        console.log('El miembro es', miembro);

        respuesta = await axiosInstance.post(urlnew, miembro);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function login(user) {
    const complemento = '/usuario/login';
    let urlnew = getUrl() + complemento; 

    try { 
        let respuesta = await axiosInstance.post(urlnew, user);
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

export async function postCliente(cliente) {
    const complemento = '/cliente';
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.post(urlnew, cliente);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function getClientesBusqueda(nombre) {
    const complemento = '/cliente'
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.get(urlnew, {params: {nombre: nombre}});
        return respuesta;
    } catch (error) {
        throw error;
    }
}