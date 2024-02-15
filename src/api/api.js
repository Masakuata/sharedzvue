import axios from 'axios';
import { limpiarSesion } from '@/utils/SessionManager';

import { storage } from '@/firebase.js';
import { ref as storageRef, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'


const httpsUrl = 'https://petloveback-x7smt.ondigitalocean.app'
const urlEdson = 'https://neutral-kindly-wildcat.ngrok-free.app'
const urlEdsonDell = 'http://192.168.1.103:8080'
const urlEdsonOfice = 'http://192.168.1.101:8080'
const urlDevEnv = 'http://clayrite.ddns.net:81'
const env = 'dev'

function getUrl() {
    return process.env.VUE_APP_CURRENT
    // if (env === 'prod') {
    //     return httpsUrl
    // } else if (env === 'of') {
    //     return urlEdsonDell
    // }else if (env === 'dev') {
    //     return urlDevEnv
    // }
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
        let respuestaJson = respuesta.json
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

export async function getClientesBusqueda(query) {
    const complemento = '/cliente'
    let urlnew = getUrl() + complemento;


    try {
        let respuesta = await axiosInstance.get(urlnew, { params: query });
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export async function getAllClientes() {
    const complemento = '/cliente/all'
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.get(urlnew);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function getProductosBusqueda(nombre, tipocliente) {
    const complemento = '/producto'
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.get(urlnew, { params: { nombre: nombre, tipo_cliente: tipocliente } });
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export async function getProductosInventario(paramsMethod) {

    const complemento = '/producto'
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.get(urlnew, { params: paramsMethod });
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function getProductoId(id) {
    const complemento = '/producto/' + id;
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.get(urlnew);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function actualizarStockProducto(id, stock) {
    const complemento = '/producto/' + id + '/stock?cant=' + stock;




    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.put(urlnew);
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
        // let respuesta = await axiosInstance.post(urlnew, venta, {
        //     responseType: 'blob'
        // });
        let respuesta = await axiosInstance.post(urlnew, venta);
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export async function deleteVenta(idVenta) {
    const complemento = '/venta/' + idVenta;
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.delete(urlnew);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function getVentas(paramsMethod) {
    const complemento = '/venta/buscar';
    let urlnew = getUrl() + complemento;



    try {
        let respuesta = await axiosInstance.get(urlnew, { params: paramsMethod });
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function getProductosLista(listaProductos) {
    const complemento = '/producto/detalles';
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.patch(urlnew, listaProductos);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function getVentaProductosDetalles(idVenta) {
    const complemento = '/venta/' + idVenta + '/productos';
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.get(urlnew);
        return respuesta;
    } catch (error) {
        throw error;
    }



}


export async function resgistrarProductos(productos) {
    const complemento = '/producto/cargar';
    let urlnew = getUrl() + complemento;
    let respuesta = {}

    try { // Reemplaza con tu URL
        respuesta = await axiosInstance.post(urlnew, productos);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function postAbono(idVenta, payload) {
    const complemento = '/venta/' + idVenta + '/abono';
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.post(urlnew, payload);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export const registrarProducto = async (producto) => {
    const complemento = '/producto';
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.post(urlnew, producto);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function getDetallesVenta(idVenta) {
    const complemento = '/venta/' + idVenta + '/details';
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.get(urlnew);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function actualizarProducto(id, producto) {
    const complemento = '/producto/' + id;
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.put(urlnew, producto);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function getTiposCliente() {

    const complemento = '/tipoCliente'

    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.get(urlnew);
        return respuesta;
    } catch (error) {
        throw error;
    }

}

export async function eliminarProducto(id) {
    const complemento = '/producto/' + id




    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.delete(urlnew);
        return respuesta;
    } catch (error) {
        throw error;
    }
}


export async function getCliente(idCliente) {
    const complemento = '/cliente/' + idCliente;
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.get(urlnew);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function putCliente(id, cliente) {
    const complemento = '/cliente/' + id;
    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.put(urlnew, cliente);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function eliminarCliente(id) {
    const complemento = '/cliente/' + id;

    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.delete(urlnew);
        return respuesta;
    } catch (error) {
        throw error;
    }

}

export async function addDireccion(idCliente, direcion) {
    const complemento = '/cliente/' + idCliente + '/direccion';
    let urlnew = getUrl() + complemento;
    try {
        let respuesta = await axiosInstance.post(urlnew, direcion);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function updateDireccion(idCliente, direcion) {
    const complemento = '/cliente/' + idCliente + '/direccion/' + direcion.id;

    let urlnew = getUrl() + complemento;
    try {
        let respuesta = await axiosInstance.put(urlnew, direcion);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function deleteDireccion(idCliente, idDireccion) {
    const complemento = '/cliente/' + idCliente + '/direccion/' + idDireccion;

    let urlnew = getUrl() + complemento;
    try {
        let respuesta = await axiosInstance.delete(urlnew);
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export async function getUrlImage(id) {
    const path = 'images/productos/' + id + '.png';
    getDownloadURL(storageRef(storage, path)).then((url) => {
        return url
    }).catch((error) => {
        return null
    })
}
export async function getReporte(paramsMethod) {
    const complemento = '/reporte';
    let urlnew = getUrl() + complemento;



    try {
        let respuesta = await axiosInstance.get(urlnew, { params: paramsMethod });
        return respuesta;
    } catch (error) {
        throw error;
    }
}
export async function postTipoCliente(tipoCliente) {
    const complemento = '/tipoCliente';
    let urlnew = getUrl() + complemento;
    try {
        let respuesta = await axiosInstance.post(urlnew, tipoCliente);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function getPrecios(idProducto) {
    const complemento = '/producto/' + idProducto + '/precios';

    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.get(urlnew);
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function getTicketVenta(idVenta) {
    // let respuesta = await axiosInstance.post(urlnew, venta, {
        //     responseType: 'blob'
        // });
    const complemento = '/venta/' + idVenta + '/ticket';

    let urlnew = getUrl() + complemento;

    try {
        let respuesta = await axiosInstance.get(urlnew, {
                 responseType: 'blob'
             });
        return respuesta;
    } catch (error) {
        throw error;
    }
}

export async function postTicket(idVenta, ticket) {
    console.log('Subiendo ticket API')
    console.log(ticket)
    
    const path = process.env.VUE_APP_FIREBASE_PATH_TICKETS + idVenta + '.pdf';
        const storageRefe = storageRef(storage, path)

        uploadBytes(storageRefe, ticket).then((snapshot) => {
            console.log('Se subió el ticket correctamente');
        });


}

export async function getUrlTicket(idVenta) {
    const path = process.env.VUE_APP_FIREBASE_PATH_TICKETS + idVenta + '.pdf';

    return getDownloadURL(storageRef(storage, path))
        .then((url) => {
            console.log('URL TICKET', url)
            return url
        })
        .catch((error) => {
            return null
        });
}

export async function deleteTicket(idVenta) {
    const path = process.env.VUE_APP_FIREBASE_PATH_TICKETS + idVenta + '.pdf';
    const storageRefe = storageRef(storage, path)

    deleteObject(storageRefe).then(() => {
        console.log('Se eliminó el ticket correctamente');
        return true
        // File deleted successfully
    }).catch((error) => {
        console.log('Error al eliminar el ticket', error);
        return false
        // Uh-oh, an error occurred!
    });
}

export async function deleteImage(idProducto) {
    
    const path = process.env.VUE_APP_FIREBASE_PATH + idProducto + '.png';

    const storageRefe = storageRef(storage, path)

    deleteObject(storageRefe).then(() => {
        console.log('Se eliminó la imagen correctamente');
        return true
        // File deleted successfully
    }).catch((error) => {
        console.log('Error al eliminar la imagen ', error);
        return false
        // Uh-oh, an error occurred!
    });
}







