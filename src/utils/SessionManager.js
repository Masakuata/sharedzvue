

export function limpiarSesion() {
    localStorage.removeItem("token");
    window.location.href = "/";
}