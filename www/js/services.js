angular.module('app.services', [])

  .factory('BlankFactory', [function () {

  }])

  .service('UserService', function () {
    // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
    var setUser = function (user_data) {
      window.localStorage.starter_facebook_user = JSON.stringify(user_data);

      firebase.database().ref('usuarios/' + user.userId).set(user_data);
    };

    var getUser = function () {
      return JSON.parse(window.localStorage.starter_facebook_user || '{}');
    };

    return {
      getUser: getUser,
      setUser: setUser
    };
  });
