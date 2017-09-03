angular.module('app.routes', ['ionicUIRouter'])

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tabs.chat', {
        url: '/chat',
        views: {
          'tab5': {
            templateUrl: 'templates/chat.html',
            controller: 'chatCtrl'
          }
        }
      })

      .state('tabs.conversa', {
        url: '/conversa/:id',
        views: {
          'tab5': {
            templateUrl: 'templates/conversa.html',
            controller: 'conversaCtrl'
          }
        }

      })


      .state('tabs.adote', {
        url: '/adote',
        views: {
          'tab1': {
            templateUrl: 'templates/adote.html',
            controller: 'adoteCtrl'
          }
        }
      })


      .state('tabs.favoritos', {
        url: '/favoritos',
        views: {
          'tab1': {
            templateUrl: 'templates/favoritos.html',
            controller: 'favoritosCtrl'
          }
        }
      })

      .state('tabs.meuspets', {
        url: '/meuspets',
        views: {
          'meusPets': {
            templateUrl: 'templates/meusPets.html',
            controller: 'meusPetsCtrl'
          }
        }
      })


      .state('tabs.perfil/:id', {
        url: '/perfil/:id',
        views: {
          'tab1': {
            templateUrl: 'templates/perfil.html',
            controller: 'perfilCtrl'
          }
        }
      })

      .state('tabs', {
        url: '/tab',
        templateUrl: 'templates/tabs.html',
        controller: 'tabsCtrl',
        abstract: true
      })

      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })

      .state('tabs.addPet', {
        url: '/addPet/:id',
        views: {
          'tab4': {
            templateUrl: 'templates/modals/addPet.html',
            controller: 'addPetCtrl'
          }
        },
        params: {
          id: null
        }
      })

      .state('tabs.addInsta', {
        url: '/addInsta',
        views: {
          'tab2': {
            templateUrl: 'templates/addInsta.html',
            controller: 'addInstaCtrl'
          }
        }
      })

      .state('tabs.instaPet', {
        url: '/instaPet',
        views: {
          'tab2': {
            templateUrl: 'templates/instaPet.html',
            controller: 'instaPetCtrl'
          }
        }
      })

      .state('signup', {
        url: '/signup',
        templateUrl: "templates/signup.html",
        controller: "signupCtrl"
      })

      .state('sobre', {
        url: '/sobre',
        templateUrl: "templates/modals/sobre.html",
        controller: "menuCtrl"
      })

      .state('filtros', {
        url: '/filtros',
        templateUrl: "templates/filtros.html",
        controller: "filtroCtrl"
      })

      .state('apoio', {
        url: '/apoio',
        templateUrl: "templates/modals/apoio.html",
        controller: "menuCtrl"
      })

      .state('relatarBugs', {
        url: '/relatarBugs',
        templateUrl: "templates/modals/ideas.html",
        controller: "menuCtrl"
      });


    $urlRouterProvider.otherwise('/login')


  });
