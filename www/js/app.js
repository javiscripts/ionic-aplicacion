// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'leaflet-directive', 'starter.controllers', 'starter.services'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      // setup an abstract state for the tabs directive

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:------------------------------------------------------------------------

      //Muestra el mapa con los restaurantes cercanos cargados
      .state('tab.resto', {
        url: '/resto',
        views: {
          'tab-resto': {
            templateUrl: 'templates/tab-resto.html',
            controller: 'RestoCtrl'
          }
        }
      })

      //Muestra los restaurantes cercanos
      .state('tab.restolist', {
        url: '/restolist',
        views: {
          'tab-restolist': {
            templateUrl: 'templates/tab-restolist.html',
            controller: 'RestoListCtrl'
          }
        }
      })

      //Muestra el detalle de dicho restaurante
      .state('tab.resto-detail', {
        url: '/restodetalle/:restoId',
        views: {
          'tab-restolist': {
            templateUrl: 'templates/resto-detail.html',
            controller: 'RestoDetailCtrl'
          }
        }
      })

      //Notificaciones para el usuario
      .state('tab.notifications', {
        url: '/notifications',
        views: {
          'tab-notifications': {
            templateUrl: 'templates/tab-notifications.html',
            controller: 'NotificationsCtrl'
          }
        }
      })

      //States de Account-----------------------------------------------------------------------------------------------

      //Pantalla principal de Account
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account':{
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })

      //Crear nuevo usuario
      .state('tab.account-create', {
        url:'/account-create',
        views:{
          'tab-account':{
            templateUrl: 'templates/account-create.html',
            controller: 'AccountCreateCtrl'
          }
        }
      })

      //Editar usuario existente
      .state('tab.account-edit', {
        url:'/account-edit',
        views:{
          'tab-account':{
            templateUrl: 'templates/account-edit.html',
            controller: 'AccountEditCtrl'
          }
        }
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/resto');

  })
;
