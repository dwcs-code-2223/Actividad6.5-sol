/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */


function login(event) {
    event.preventDefault();

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

                } else {
                    console.error('La autenticación ha fallado');
                    showErrorLogin('La autenticación ha fallado', true);
                }
            }
            )
            .catch((error) => {
                console.error('Ha ocurrido un error en login' + error);
            });


}


function loginJSON(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let pwd = document.querySelector("#pwd").value;
    let rol = document.querySelector("#rol").value;


    let login_url = "?controller=Usuario&action=loginJSON";

    const data = {'email': email, 'pwd': pwd, 'rol': rol};

    const request = new Request(base_url + login_url, {
        method: "POST",
        body: JSON.stringify(data)
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

                } else {
                    console.error('La autenticación ha fallado');
                    showErrorLogin('La autenticación ha fallado', true);
                }
            }
            )
            .catch((error) => {
                console.error('Ha ocurrido un error en login' + error);
            });


}
function logout(event) {
    event.preventDefault();
    let logout_url = "?controller=Usuario&action=logout";

    const request = new Request(base_url + logout_url, {
        method: "POST"

    });

    fetch(request)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.log("Something went wrong on API server!");
                    return false;
                }
            }
            ).
            then((response) => {
                if ((response.error === true) || (response === false)) {
                    showErrorLogin('Ha habido un error en el cierre de sesión', true);
                }
                toggleLoginMain('');
            })
            .catch((error) => {
                console.error('Ha ocurrido un error en login' + error);
            });
}


function toggleLoginMain(email) {

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

    if (email.trim() === '') {
        //vaciamos el main
        main.innerHTML = '';
    }

}

function showErrorLogin(msg, show) {
    var divError = document.getElementById("errorLogin");
    if (show) {
        divError.innerHTML = msg;
        divError.classList.remove('d-none');
        setTimeout(function () {
            divError.innerHTML = '';
            divError.classList.add('d-none');
        }
        , 2000);
    } else {
        divError.innerHTML = '';
        divError.classList.add('d-none');
    }
}

