angular.module('app.routes', ['ionicUIRouter'])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


      .state('tabsController.adote', {
        url: '/adote',
        views: {
          'tab1': {
            templateUrl: 'templates/adote.html',
            controller: 'adoteCtrl'
          }
        }
      })

      .state('tabsController.desaparecidos', {
        url: '/desaparecidos',
        views: {
          'tab2': {
            templateUrl: 'templates/desaparecidos.html',
            controller: 'desaparecidosCtrl'
          }
        }
      })




      /*
       The IonicUIRouter.js UI-Router Modification is being used for this route.
       To navigate to this route, do NOT use a URL. Instead use one of the following:
       1) Using the ui-sref HTML attribute:
       ui-sref='tabsController.perfil'
       2) Using $state.go programatically:
       $state.go('tabsController.perfil');
       This allows your app to figure out which Tab to open this page in on the fly.
       If you're setting a Tabs default page or modifying the .otherwise for your app and
       must use a URL, use one of the following:
       /page1/tab1/page3
       /page1/tab4/page3
       */
      .state('tabsController.perfil', {
        url: '/perfil',
        views: {
          'tab1': {
            templateUrl: 'templates/perfil.html',
            controller: 'perfilCtrl'
          }
          // ,
          // 'tab4': {
          //   templateUrl: 'templates/perfil.html',
          //   controller: 'perfilCtrl'
          // }
        }
      })

      .state('tabsController', {
        url: '/tab',
        templateUrl: 'templates/tabsController.html',
        abstract: true
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })

      .state('tabsController.filtros', {
        url: '/page7',
        views: {
          'tab3': {
            templateUrl: 'templates/filtros.html',
            controller: 'filtrosCtrl'
          }
        }
      })

      .state('tabsController.addPet', {
        url: '/addPet',
        views: {
          'tab4': {
            templateUrl: 'templates/addPet.html',
            controller: 'addPetCtrl'
          }
        }
      })

      .state('signup', {
        url: '/signup',
        templateUrl: "templates/signup.html",
        controller: "signupController"
      })

    $urlRouterProvider.otherwise('/login')


  });
