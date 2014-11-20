'use strict';

app.controller('AuthCtrl', function($scope, $location, Auth, user) {
  if (Auth.signedIn()) {
    console.log('AuthCtrl Current User:', user);
    $location.path('/');
  }

  $scope.user = user;  // Give the view access to the user object

  $scope.login = function() {
    Auth.login($scope.user).then(function() {
      $location.path('/');
    }).catch(function(error) {
      $scope.error = error.toString();
    });
  };

  $scope.register = function() {
    console.log('Inside AuthCtrl', $scope.user);
    Auth.register($scope.user).then(function () {
      console.log('user created successfully!');
      return Auth.login($scope.user).then(function(authData) {
        console.log('Logged in as:', authData.uid);
        $location.path('/');
      }).catch(function(error) {
        $scope.error = error.toString();
        console.log('Error:', error);
      });
    }).catch(function (error) {
      $scope.error = error.toString();
      console.log('Error:', error);
    });
  };

});
