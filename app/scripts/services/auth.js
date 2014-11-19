'use strict';

app.factory('Auth', function($firebaseAuth, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);  // The new way to sign in

  var Auth = {
    register: function(user) {
      console.log('inside Register:', user);
      return auth.$createUser(user.email, user.password);
    },
    login: function(user) {
      auth.$authWithPassword(user);
    },
    logout: function() {
      auth.$logout();
    },
    currentUser: function() {
      return auth.$getCurrentUser();
    },
    signedIn: function() {
      //auth.$getCurrentUser().then(function(currentUser) {
      //  console.log(currentUser);
      //}, function() {
      //  console.log('error in signedIn');
      //});
      return !!Auth.user.provider;
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
