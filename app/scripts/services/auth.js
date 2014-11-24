(function(){

  'use strict';

  app.service('Auth', function($firebaseAuth, $firebase, FIREBASE_URL, $rootScope, md5) {
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
    var emptyUser = {email: '', password: ''};

    var Auth = {
      register: function(user) {
        return auth.$createUser(user.email, user.password);
      },
      createProfile: function(user) {
        var profile = {
          username: user.username,
          md5Hash: md5.createHash(user.email)
        };
        var profileRef = $firebase(ref.child('profile'));
        return profileRef.$set(user.uid, profile);
      },
      login: function(user) {
        return auth.$authWithPassword(user);
      },
      logout: function() {
        auth.$unauth();
      },
      currentUser: function() {
        return auth.$getAuth() || emptyUser;
      },
      signedIn: function() {
        return !!auth.$getAuth();
      },
      user: emptyUser
    };

    auth.$onAuth(function(user) {
      if (user) {  // user is logged in
        angular.copy(user, Auth.user);
        Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();
      } else {     // user is logged out
        if (Auth.user && Auth.user.profile) {
          Auth.user.profile.$destroy();
        }
        emptyUser = {email: '', password: ''};
        if (!angular.equals(emptyUser, Auth.user)) {
          angular.copy(emptyUser, Auth.user);
        }
      }
    });

    return Auth;
  });

})();
