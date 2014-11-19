'use strict';

// Injector cannot find the location of the 'user' dependency
app.controller('AuthCtrl', function($scope, $location, Auth, user) {
  if (Auth.signedIn()) {
    console.log('AuthCtrl Current User:', user);
    $location.path('/');
  }

  $scope.user = user;  // Give the view access to the user object

  $scope.register = function() {
    console.log('Inside AuthCtrl', user, $scope.user);
    Auth.register(user).then(function () {
      console.log('user created successfully!');
      return Auth.login(user);
    }).then(function (authData) {
      console.log('Logged in as:', authData.uid);
      $location.path('/');
    }).catch(function (error) {
      console.log('Error:', error);
    });
  };
});
