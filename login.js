document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("loginModal");
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");
    const logoutButton = document.getElementById("logoutButton");

    // Cargar usuario al inicio si existe en sessionStorage
    const usuarioGuardado = JSON.parse(sessionStorage.getItem('usuario'));
    if (usuarioGuardado) {
        loginModal.classList.add("hidden");
        manejarAccesoPorRol(usuarioGuardado);
    } else {
        loginModal.classList.remove("hidden");
    }

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        // Resetear mensajes de error
        usernameError.style.display = "none";
        passwordError.style.display = "none";
        
        let isValid = true;

        // Valores de usuario y contraseña esperados
        const expectedUsername = "Leonardo";
        const expectedPassword = "Rayados1";

        // Validación del username
        if (usernameInput.value !== expectedUsername) {
            usernameError.textContent = "Incorrect username.";
            usernameError.style.display = "block";
            isValid = false;
        }

        // Validación de la contraseña
        if (passwordInput.value !== expectedPassword) {
            passwordError.textContent = "Incorrect password.";
            passwordError.style.display = "block";
            isValid = false;
        }

        // Si es válido, cerrar el modal y crear objeto de usuario
        if (isValid) {
            const usuario = {
                nombre: usernameInput.value,
                rol: "admin" // Cambiar según tu lógica de roles
            };
            sessionStorage.setItem('usuario', JSON.stringify(usuario)); // Guardar en sessionStorage
            alert("Login successful!");
            loginModal.classList.add("hidden");
            manejarAccesoPorRol(usuario); // Llamar a la función para manejar la vista
        }
    });

    // Manejar el botón de Cerrar sesión
    logoutButton.addEventListener("click", () => {
        sessionStorage.removeItem('usuario'); // Borrar la sesión
        alert("Sesión cerrada");
        window.location.reload(); // Recargar la página para pedir el login de nuevo
    });
});

function manejarAccesoPorRol(usuario) {
    if (!usuario || !usuario.rol) return;

    // Ejemplo de restricción y cambios visuales
    const enlacesAdmin = document.querySelectorAll('.admin-only');
    const enlacesCliente = document.querySelectorAll('.cliente-only');

    if (usuario.rol === 'admin') {
        enlacesCliente.forEach(el => el.style.display = 'none');
        // Cambios visuales específicos para admin
        document.body.style.backgroundColor = '#f0f0f0';
    } else if (usuario.rol === 'cliente') {
        enlacesAdmin.forEach(el => el.style.display = 'none');
        // Cambios visuales específicos para cliente
    }
}
