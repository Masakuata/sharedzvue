




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

export const getHoyDate = () => {
    const hoy  = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
    const fecha =  hoy.toISOString().split('T')[0];
    return fecha;
}

export const getAnioActural = () => {
    const hoy  = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
    return hoy.getFullYear();
}

export const getMesActual = () => {
    let meses = [
        { value: 1, texto: 'Enero' },
        { value: 2, texto: 'Febrero' },
        { value: 3, texto: 'Marzo' },
        { value: 4, texto: 'Abril' },
        { value: 5, texto: 'Mayo' },
        { value: 6, texto: 'Junio' },
        { value: 7, texto: 'Julio' },
        { value: 8, texto: 'Agosto' },
        { value: 9, texto: 'Septiembre' },
        { value: 10, texto: 'Octubre' },
        { value: 11, texto: 'Noviembre' },
        { value: 12, texto: 'Diciembre' }
    ]
    const hoy  = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"}));
    let numeroMes = hoy.getMonth() + 1;

    //encontrar el indice el mes de hoy
    let index = meses.findIndex(mes => mes.value === numeroMes);

    return meses[index]

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