'use strict';

// Injector cannot find the location of the 'user' dependency
app.controller('AuthCtrl', function($scope, $location, Auth, user) {
//  if (user) {
  if (Auth.signedIn()) {
    console.log('AuthCtrl Current User:', user);
    $location.path('/');
  }

  $scope.user = {
    email: '',
    password: ''
  };
  //user = {
  //  email: 'eemaaillll@example.com',
  //  password: '123'
  //};

  $scope.register = function() {
    console.log('Inside AuthCtrl', user);
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
