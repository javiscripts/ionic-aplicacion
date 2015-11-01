angular.module('starter.services', [])


  .factory('Resto', function($http) {

    var connection = function(C, parametros) {
      //Parametros de coneccion completos
      var req = {
        method: 'POST',
        url: "http://ws.esy.es/api.php",
        headers: {'Content-Type': 'multipart/form-data'},
        params: parametros
      };

      //Lanza los datos a C
      $http (req)
        .then(
        function(response){
          console.log("conexion exitosa...");
          console.log(response.data);
          C(response.data);
        },
        function(response) {
          console.log("error en la conexion");
          console.log(response.status);
        }
      );
    };

    return {
      //get Restaurant by Proximity
      getRbyProx: function(C) {
        var parametros = { comando: 'obtener' };
        connection(C, parametros);
      },
      getRbyId: function(restoId, C) {
        var parametros = {comando:'obtener', Id:restoId};
        connection(C, parametros);
      }
    };
  })

  .factory('User', function(){

    //Coneccion a la db
    var conecction = function(C, parametros) {
      //Parametros de coneccion completos
      var req = {
        method: 'POST',
        url: "http://ws.esy.es/api.php",
        headers: {'Content-Type': 'multipart/form-data'},
        params: parametros
      };

      //Lanza los datos a C
      $http (req)
        .then(
        function(response){
          console.log("conexion exitosa...");
          console.log(response.data);
          C(response.data);
        },
        function(response) {
          console.log("error en la conexion");
          console.log(response.status);
        }
      );
    };

    //Usuario logueado(session) (variable de tipo session, para el usuario recien ingresado.)
    var sessionUser = {
      nickName:"Federico Mercado",
      password:'',
      location:''
    };

    //MyLocation(session) (variable de tipo session, toma la localizacion actual en coordenadas (tomado desde cordoba.))
    var centro = {
      lat: -33.3013362499188,
      lng: -66.3378417491913,
      zoom: 14
    }

    return {
      login: function(nick, pass){
        //llamada a la base de datos
        sessionUser.nickName = nick;  //imaginando que el usuario existe y es correcta la contraseña
      },
      logout: function () {
        sessionUser.nickName = null;
      },
      checkSession: function(){
        if(sessionUser.nickName === null){
          return false;
        }else{
          return true;
        }
      },
      getSessionUser: function(){
        return sessionUser;
      },
      getLocation: function(){
        return centro;
      }
    }
  }
);
