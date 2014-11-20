'use strict';

app.factory('Auth', function($firebaseAuth, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  var Auth = {
    register: function(user) {
      console.log('Register', user);
      return auth.$createUser(user.email, user.password);
    },
    login: function(user) {
      console.log('Login', user);
      return auth.$authWithPassword(user);
    },
    logout: function() {
      auth.$unauth();
    },
    currentUser: function() {
      return this.user;
    },
    signedIn: function() {
      return auth.$getAuth();
    },
    user: {email: '', password: ''}
  };

  $rootScope.$on('$firebaseAuth:login', function(event, user) {
    console.log('logged in');
    angular.copy(user, Auth.user);
  });
  $rootScope.$on('$firebaseAuth:logout', function() {
    console.log('logged out');
    angular.copy({}, Auth.user);
  });
  return Auth;
});
