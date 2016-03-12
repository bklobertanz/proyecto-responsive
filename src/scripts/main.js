(function(){

  var loadCSS = require('./lib/loadCSS.js');
  
  document.addEventListener('DOMContentLoaded',onDOMLoad);/*se ejecutarán
  todas las funciones, una vez que el DOM haya cargado.*/
  var header= document.getElementById('header');
  var navbarMenu = document.getElementById('navbarMenu');
  var btnMenu = document.getElementById('btnMenu');
  var alturaY=636;

  function onDOMLoad(){

    btnMenu.addEventListener('click', onClickMenu);

    loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css');
    loadCSS("https://fonts.googleapis.com/css?family=Montserrat|Lato");

    function onClickMenu() {
      navbarMenu.classList.toggle('header-menu-list--show');
    }

    function onScrollLight(){

      if(window.scrollY >= alturaY)
      {
        header.classList.toggle('header--light');
        btnMenu.classList.toggle('header-btn-navbar--light');
      }
      else {
        header.classList.toggle("header");
        btnMenu.classList.toggle("header-btn-navbar");

      }
  }
}
})();
