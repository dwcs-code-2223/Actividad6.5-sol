/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

var base_url = "http://localhost/dwcs/ud6/Actividad6.4-Enunciado/controller/FrontController.php";

window.onload = onceLoaded;


function onceLoaded() {

    console.debug("window loaded");
    document.querySelector('#formLogin').onsubmit = loginJSON;
    document.querySelector('#formLogout').onsubmit = function (event) {
        event.preventDefault();
        showModal('spa_modal', 'Confirmación',
                '¿Está seguro de que desea cerrar sesión?',
                'Sí', null, logout, null);
    };
    getRoles();
}
function showModal(modal_id, title, msg, opt_ok_text = null,
        opt_cancel_text = null, opt_ok_function = null, opt_cancel_function = null) {
    var myModal = new bootstrap.Modal(document.getElementById(modal_id));
    myModal.show();
}

