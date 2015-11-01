angular.module('starter.controllers', [])

  .controller('RestoCtrl', function($scope, Resto, User){
    // Se inicializa markers (donde se guardan los puntos
    Resto.getRbyProx(function(datos){
      $scope.restaurantes = datos;
    });
    $scope.markers =[];
    
    // centro fijo en san luis -- despues tomara valor segun los puntos
    $scope.centro = User.getLocation();

    Resto.getRbyProx(function(C){
      C.forEach(function(item) {
        $scope.markers.push( {
          lat: parseFloat(item.latitud),
          lng: parseFloat(item.longitud),
          message: item.nombre,
          focus: true,
          draggable: false
        });
      });
    });
  })

  .controller('RestoListCtrl', function($scope, Resto) {
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    /* Ejemplo de CallBack
    var callback = function(datos){
      console.log(datos);
      $scope.restaurantes = datos;
    }
    Resto.getRbyProx(callback);
    */

    Resto.getRbyProx(function(datos){
      $scope.restaurantes = datos;
    });
  })

  .controller('RestoDetailCtrl', function($scope, $stateParams, Resto) {
    Resto.getRbyId($stateParams.restoId, function(C){
      $scope.restoSeleccionado = C[0];
    });
  })

  .controller('NotificationsCtrl', function($scope, User){

  })

  //--------------------------------------------------------------------------------------------------------------------
  //---------------------------------Controlador de la Barra-----------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------

.controller('navBarCtrl', function($window, $rootScope, $scope, $ionicPopover){
  
    $rootScope.ejemplo = "true";
    $rootScope.toggle = "true";
    
    $rootScope.cambiarToggle =function()
        {
        $rootScope.toggle != $rootScope.toggle;
        }
    
    $rootScope.cambiar = function(){
        $rootScope.ejemplo = !$rootScope.ejemplo;
    }
  
  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
    
  });
  })

//--------------------------------------------------------------------------------------------------------------------
  //----------------------------------Accounts--------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------

  .controller('AccountCtrl', function($scope, User, $http) {

    //Establece la pantalla a ver dependiendo si inicio session o no.
    $scope.sesionIniciada = User.checkSession();

    // conexion a internet
    console.log("AccountCtrl solicita conexion....");
    $http.get("http://ws.esy.es/api.php?comando=usuario")
      .success(function(dato){
        console.log(dato);
        if (dato.mensaje == "") {
          $scope.sesionIniciada = false; //Actualiza la pantalla.
          $scope.usuario = "";
        } else {
          $scope.sesionIniciada = true; //Actualiza la pantalla.
          //Carga los datos del usuario en un objeto para mostrarlos si el usuario ya esta logueado.
          $scope.usuario = dato.mensaje;
        }
      });







    $scope.logout = function(){
      User.logout();

      // conexion a internet
      console.log("AccountCtrl solicita conexion....");
      $http.get("http://ws.esy.es/api.php?comando=cerrarsesion")
        .success(function(dato){
          console.log(dato[0]);
          $scope.sesionIniciada = false; //Actualiza la pantalla.
          $scope.usuario = "";
        });
    };











    $scope.login = function(nick, pass){
      User.login(nick, pass);

      $scope.mensaje="iniciando sesion...";
      // conexion a internet
      console.log("AccountCtrl solicita conexion....");
      // esto es codigo de conexion a internet,
      var datos = {
        comando: 'sesion',
        nusuario: nick,
        clave: pass
      };


      var req = {
        method: 'POST',
        url: "http://ws.esy.es/api.php",
        headers: {  'Content-Type': 'multipart/form-data'  },
        params: datos
      };

      $http(req)
        .success ( function(dato) {
        $scope.lista = dato;
        console.log("ListaCtrl conectado");
        console.log(dato[0]);
        if (dato[0].mensaje == "iniciado") {
          $scope.sesionIniciada = true; //Actualiza la pantalla.
          $scope.mensaje="";
          $scope.usuario = nick;
        } else {
          $scope.mensaje="Error, compruebe los datos e intente nuevamente";
        }
      });


    };
  })

  .controller('AccountCreateCtrl', function($scope, User){})

  .controller('AccountEditCtrl', function($scope, User) {})
;
