import axios from 'axios';


const httpsUrl = 'https://petloveback-x7smt.ondigitalocean.app'
const urlEdson = 'https://neutral-kindly-wildcat.ngrok-free.app'
const url = 'http://clayrite.ddns.net:81'
const env = 'prod'

function getUrl() {
    if (env === 'prod') {
        return httpsUrl
    } else {
        return urlEdson
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

export async function getProductosBusqueda(nombre, tipocliente) {
    const complemento = '/producto'
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.get(urlnew, {params: {nombre: nombre, tipo_cliente: tipocliente}});
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function postProducto(producto) {
    const complemento = '/producto';
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.post(urlnew, producto);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function postVenta(venta) {
    const complemento = '/venta';
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.post(urlnew, venta);
        return respuesta;
    } catch (error) {
        throw error;
    }
}