
var base_url = "http://localhost/dwcs/ud6/Ejemplo/Ejemplo_UD6_SPA/controller/FrontController.php";

window.onload = onceLoaded;


function onceLoaded() {

    console.debug("window loaded");
    document.querySelector('#formLogin').onclick = login;
    document.querySelector('#email').oninput = onEmailInput;
    getRoles();
}
function onEmailInput() {
    setErrorLoginVisible('', false);
}

function getRoles() {
    let roles_url = "?controller=Usuario&action=getRoles";

    fetch(base_url + roles_url)
            .then(response => {
                roles = response.json();
                return roles;

            })
            .then(roles => {
                buildRolesSelect(roles);
            }).catch((error) => {
        console.log('Ha ocurrido un error: ' + error);
    });
}

function buildRolesSelect(roles) {
    let select_roles = document.querySelector('#rol');
    for (let i = 0; i < roles.length; i++) {
        let option = '<option value="' + roles[i].id + '">' + roles[i].name + '</option>';
        select_roles.innerHTML += option;
    }
}

function login(event) {
    event.preventDefault();

    setErrorLoginVisible('', false);

    let email = document.getElementById('email').value;
    let pwd = document.querySelector("#pwd").value;
    let rol = document.querySelector("#rol").value;


    let login_url = "?controller=Usuario&action=login";

    const data = new FormData();
    data.append('email', email);
    data.append('pwd', pwd);
    data.append('rol', rol);

    const request = new Request(base_url + login_url, {
        method: "POST",
        body: data
    });

    fetch(request)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 400) {
                    console.log('error 400');
                    return false;
                } else {
                    console.log("Something went wrong on API server!");
                    return false;
                }

            })
            .then((response) => {
                console.log(response);
                if (response.userId && response.email) {

                    toggleLoginMain(response.email);


                    let btnCerrar = document.getElementById('btnCerrar');
                    btnCerrar.onclick = cerrarSesion;
                    cargarUsuarios();
                } else {
                    setErrorLoginVisible('La autenticación ha fallado', true);
                }
            }
            )
            .catch((error) => {
                console.error('Ha ocurrido un error en login' + error);
            });


}


function setErrorLoginVisible(msg, visible) {
    let errorlogin = document.getElementById("errorLogin");
    if (visible) {
        errorlogin.classList.remove('d-none');
    } else {
        errorlogin.classList.add('d-none');
    }
    errorlogin.innerHTML = msg;
}

function cargarUsuarios() {

    let list_users_url = "?controller=Usuario&action=list";


    fetch(base_url + list_users_url)

            .then(response => {
                let users = response.json();
                return users;

            })
            .then(users => {
                let table = crearTabla(users);
                let main = document.getElementById('main');
                main.appendChild(table);



            }).catch((error) => {
        console.log('Ha ocurrido un error en cargarUsuarios: ' + error);
    });
}

function crearTabla(users) {
    let table = document.createElement('table');
    //añadimos clase css de bootstrap https://getbootstrap.com/docs/5.0/content/tables/
    table.classList.add('table');
    let thead = document.createElement('thead');
    table.appendChild(thead);
    let fila_cab = crear_fila(["Email", "Roles"], 'th');
    thead.appendChild(fila_cab);

    let tbody = document.createElement('tbody');
    for (let i = 0; i < users.length; i++) {
        let fila_body = crear_fila(users[i], 'td');
        tbody.append(fila_body);
    }

    table.appendChild(tbody);
    return table;
}
/**
 * Crea un elemento tr con celdas th o td con los datos incluidos en el 
 * @param {Object} object Puede tratarse de un array de índices numéricos con las cadenas que se incluirán dentro de las celdas o un objeto JSON cuyos valores formarán parte de las celdas
 * @param {String} th_td Se indica si se crearán celdas th o td mediante 'th' o 'td'
 * @returns {HTMLElement} Devuelve el elemento tr
 */
function crear_fila(object, th_td) {

    const keys = Object.keys(object);

    let tr = document.createElement('tr');

    for (let i = 0; i < keys.length; i++) {
        let celda = document.createElement(th_td);
        const key = keys[i];
        celda.innerHTML = object[key];

        tr.appendChild(celda);
    }
    return tr;
}

function cerrarSesion(e) {
    alert('cerrando sessión');
    e.preventDefault();
    let logout_url = "?controller=Usuario&action=logout";

    const request = new Request(base_url + logout_url, {
        method: "POST"
    });

    fetch(request)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else
                    console.log("Something went wrong on API server!");
                return false;
            })
            .then((response) => {
                console.log(response);
                //Mostramos siempre el login
                toggleLoginMain('');
                if (response === false) {
                    //error en la lectura del json
                    setErrorLoginVisible('No se ha cerrado sesión correctamente', true);
                }
            }
            )
            .catch((error) => {
                console.error('Ha ocurrido un error en logout' + error);
            });


}

function toggleLoginMain(email) {

//ocultamos el mensaje de error
    setErrorLoginVisible('', false);

    let main = document.getElementById('main');
    let login = document.getElementById('login');
    let usuarioCabecera = document.getElementById('userHeader');
    let emailHeader = document.getElementById('email_header');

    emailHeader.innerHTML = email;
// https://getbootstrap.com/docs/5.0/utilities/display/
    emailHeader.classList.toggle('d-none');


    login.classList.toggle('d-none');

    main.classList.toggle('d-none');
    usuarioCabecera.classList.toggle('d-none');



}


