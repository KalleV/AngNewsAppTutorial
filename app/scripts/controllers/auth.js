'use strict';

// Injector cannot find the location of the 'user' dependency
app.controller('AuthCtrl', function($scope, $location, Auth, user) {
  if (user) {
    $location.path('/');
  }
  //else {
  //  user = {};
  //}

  //this.register = function() {
  user = {
    email: "emaillll@example.com",
    password: "123"
  };

  $scope.register = function() {
    console.log('Inside AuthCtrl', user);
    Auth.register(user).then(function(err) {
      if (err) {
        switch (err.code) {
          case 'EMAIL_TAKEN':
            console.log('Email already in use');
            break;
          case 'INVALID_EMAIL':
            console.log('Invalid email');
            break;
          default:
            console.log('Error did not match an error code');
            break;
        }
      }
      Auth.login(user);
    }).then(function(authData) {
      console.log('Logged in as:', authData.uid);
      $location.path('/');
    }).catch(function(error) {
      console.log('Error', error);
    });
  };

  //$scope.register = function() {
  //  console.log('Inside AuthCtrl', user);
  //  Auth.register(user).then(function (authUser) {
  //    console.log('authUser:', authUser);
  //    Auth.login(user);
  //    $location.path('/');
  //  });
  //};

  //Auth.register(user).then(function() {
  //  console.log('Inside AuthCtrl (after registering)', user);
  //  return Auth.login(user).then(function() {
  //    $location.path('/');
  //  });
  //});

});
