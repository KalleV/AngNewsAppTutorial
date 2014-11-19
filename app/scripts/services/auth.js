'use strict';

app.factory('Auth', function($firebaseAuth, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);  // The new way to sign in

  var Auth = {
    register: function(user) {
      console.log('Register', user);
      return auth.$createUser(user.email, user.password);
    },
    login: function(user) {
      return auth.$authWithPassword(user);
    },
    logout: function() {
      auth.$unauth();
    },
    currentUser: function() {
      var user = auth.$getAuth();
      if (!user) {
        return {};
      }
      return user;
//      return auth.$getAuth();
    },
    signedIn: function() {
      return auth.$getAuth();// !== null;
    },
    user: {}
  };

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    console.log('logged in');
    angular.copy(user, Auth.user);
  });
  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    console.log('logged out');
    angular.copy({}, Auth.user);
  });
  return Auth;
});
