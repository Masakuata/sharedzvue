import { isFuture } from "date-fns";
import { ref } from "vue";




export const validateEmail = (email) => {
    const regex = 
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return regex.test(email);
}

export const validatePassword = (password) => {
    return password.length > 6;
}

export const validateName = (name) => {
    return name.length > 5;
}

export const validateRFC = (rfc) => {
    const regexRFC = /^([A-ZÑ&]{3,4})\d{6}([A-Z\d]{3})?$/;
    return regexRFC.test(rfc);
}

export const isFutureDate = (dia, mes, anio) => {

    let dateParam = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
    dateParam.setFullYear(anio);
    dateParam.setMonth(mes-1);
    dateParam.setDate(dia);

    
    const hoy  = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"}));

    
    
    if(
        dateParam.getUTCDate() == hoy.getUTCDate() &&
        dateParam.getUTCMonth() == hoy.getUTCMonth() &&
        dateParam.getUTCFullYear() == hoy.getUTCFullYear()
        
        ){
        
        return false;
    }
    
    return dateParam > hoy;

}

export const getHoyString = () => {
    const hoy  = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
    let  fechaString = hoy.toLocaleString('es-MX', { timeZone: 'America/Mexico_City' });


  
    fechaString = fechaString.toString()
    fechaString = fechaString.substring(0, 9);
    fechaString = fechaString.replaceAll('/', '-');
    
    return fechaString;
}

export const filtrarEntrada = (input) => {
    // Primero, quitar todos los caracteres que no sean dígitos o puntos
    let filtrado = input.replace(/[^\d.]/g, '');

    // Comprobar si hay más de un punto en la cadena
    if ((filtrado.match(/\./g) || []).length > 1) {
        // Dejar solo el primer punto y eliminar los demás
        let partes = filtrado.split('.');
        filtrado = partes.shift() + '.' + partes.join('');
    }

    return filtrado;
}