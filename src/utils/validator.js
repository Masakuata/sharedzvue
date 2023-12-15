



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