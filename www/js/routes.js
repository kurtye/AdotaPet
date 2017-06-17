angular.module('app.routes', ['ionicUIRouter'])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js

        /*
         The IonicUIRouter.js UI-Router Modification is being used for this route.
         To navigate to this route, do NOT use a URL. Instead use one of the following:
         1) Using the ui-sref HTML attribute:
         ui-sref='tabs.perfil'
         2) Using $state.go programatically:
         $state.go('tabs.perfil');
         This allows your app to figure out which Tab to open this page in on the fly.
         If you're setting a Tabs default page or modifying the .otherwise for your app and
         must use a URL, use one of the following:
         /page1/tab1/page3
         /page1/tab4/page3
         */

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

            .state('tabs.filtros', {
                url: '/page7',
                views: {
                    'tab3': {
                        templateUrl: 'templates/filtros.html',
                        controller: 'filtrosCtrl'
                    }
                }
            })

            .state('tabs.addPet', {
                url: '/addPet',
                views: {
                    'tab4': {
                        templateUrl: 'templates/modals/addPet.html',
                        controller: 'addPetCtrl'
                    }
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

        $urlRouterProvider.otherwise('/login')


    });
