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