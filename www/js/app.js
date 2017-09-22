angular.module('app', ['ionic','ionic.cloud', 'app.controllers', 'app.routes', 'app.directives', 'app.services',
  'app.configs', 'ngAnimate', 'ngImageCompress',])

    .config(['$httpProvider', '$ionicConfigProvider', '$sceDelegateProvider', '$stateProvider', '$ionicCloudProvider',
      function ($httpProvider, $ionicConfigProvider, $sceDelegateProvider, $stateProvider, $ionicCloudProvider) {
        $stateProvider

            .state('menu', {
                url: '/menu',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'menuCtrl'
            });

        $ionicCloudProvider.init({
            "core": {
                "app_id": "107b46ee"
            },
            "auth": {
                "google": {
                    //trocar webClient para testes
                    // "webClientId": "31439353449-a4mklvh2ugb65qrg5ie9ru9j3ojrdpa6.apps.googleusercontent.com",
                    "webClientId": "31439353449-c8h94379gm3vdump7bboenbtco3i1ufa.apps.googleusercontent.com",
                    // "webClientId": "908321839770-i7ri4c8f42h13i87cbnup9s1krnm22fs.apps.googleusercontent.com",


                    "scope": ["permission1", "permission2"]
                }
            },

          "auth": {
            "facebook": {
              "scope": ["user_location"]
            }
          }
        });

        $sceDelegateProvider.resourceUrlWhitelist([ 'self','*://www.youtube.com/**', '*://player.vimeo.com/video/**']);
}])

.run(function ($ionicPlatform, CONFIG) {


    $ionicPlatform.ready(function () {

      window.FirebasePlugin.getToken(function(token) {
        // save this server-side and use it to push notifications to this device
        console.log(token);
      }, function(error) {
        console.error(error);
      })


        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }


      // AppRate.preferences = {
      //   openStoreInApp: true,
      //   displayAppName: 'Adota Pet',
      //   usesUntilPrompt: 5,
      //   promptAgainForEachNewVersion: false,
      //   storeAppURL: {
      //     ios: '<my_app_id>',
      //     android: 'market://details?id=com.labup.adotapet',
      //     windows: 'ms-windows-store://pdp/?ProductId=<the apps Store ID>',
      //     blackberry: 'appworld://content/[App Id]/',
      //     windows8: 'ms-windows-store:Review?name=<the Package Family Name of the application>'
      //   },
      //   customLocale: {
      //     title: "Would you mind rating %@?",
      //     message: "It won’t take more than a minute and helps to promote our app. Thanks for your support!",
      //     cancelButtonLabel: "No, Thanks",
      //     laterButtonLabel: "Remind Me Later",
      //     rateButtonLabel: "Rate It Now",
      //     yesButtonLabel: "Yes!",
      //     noButtonLabel: "Not really",
      //     appRatePromptTitle: 'Do you like using %@',
      //     feedbackPromptTitle: 'Mind giving us some feedback?',
      //   },
      //   callbacks: {
      //     handleNegativeFeedback: function(){
      //       window.open('mailto:feedback@example.com','_system');
      //     },
      //     onRateDialogShow: function(callback){
      //       callback(1) // cause immediate click on 'Rate Now' button
      //     },
      //     onButtonClicked: function(buttonIndex){
      //       console.log("onButtonClicked -> " + buttonIndex);
      //     }
      //   }
      // };
      //
      // AppRate.promptForRating();

      // 1
      AppRate.preferences.useLanguage = 'en';

// 2
      var popupInfo = {};
      popupInfo.title = "Rate Adota Pet";
      popupInfo.message = "Você gostaria de avaliar Adota Pet? isso é muito importante para continuarmos o trabalho, obrigado!";
      popupInfo.cancelButtonLabel = "Não, Obrigado";
      popupInfo.laterButtonLabel = "Me lembre depois";
      popupInfo.rateButtonLabel = "Avalie o Adota Pet";
      AppRate.preferences.customLocale = popupInfo;

// 3
      AppRate.preferences.openStoreInApp = true;

// 4
//       AppRate.preferences.storeAppURL.ios = '849930087';
      AppRate.preferences.storeAppURL.android = 'https://play.google.com/store/apps/details?id=com.labup.adotapet';

// 5
      AppRate.preferences.usesUntilPrompt = 10;
      // AppRate.promptForRating();
      AppRate.promptForRating(false);
    })

    //Inicialização do Firebase
    firebase.initializeApp({
        apiKey: CONFIG.FIREBASE_API,
        authDomain: CONFIG.FIREBASE_AUTH_DOMAIN,
        databaseURL: CONFIG.FIREBASE_DB_URL,
        storageBucket: CONFIG.FIREBASE_STORAGE,
        messagingSenderId: CONFIG.FIREBASE_STORAGE
    });


})







/*
 This directive is used to disable the "drag to open" functionality of the Side-Menu
 when you are dragging a Slider component.
 */
    .directive('disableSideMenuDrag', ['$ionicSideMenuDelegate', '$rootScope', function ($ionicSideMenuDelegate, $rootScope) {
        return {
            restrict: "A",
            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {

                function stopDrag() {
                    $ionicSideMenuDelegate.canDragContent(false);
                }

                function allowDrag() {
                    $ionicSideMenuDelegate.canDragContent(true);
                }

                $rootScope.$on('$ionicSlides.slideChangeEnd', allowDrag);
                $element.on('touchstart', stopDrag);
                $element.on('touchend', allowDrag);
                $element.on('mousedown', stopDrag);
                $element.on('mouseup', allowDrag);

            }]
        };
    }])


    /*
     This directive is used to open regular and dynamic href links inside of inappbrowser.
     */
    .directive('hrefInappbrowser', function () {
        return {
            restrict: 'A',
            replace: false,
            transclude: false,
            link: function (scope, element, attrs) {
                var href = attrs['hrefInappbrowser'];

                attrs.$observe('hrefInappbrowser', function (val) {
                    href = val;
                });

                element.bind('click', function (event) {

                    window.open(href, '_system', 'location=yes');

                    event.preventDefault();
                    event.stopPropagation();

                });
            }
        };
    });
