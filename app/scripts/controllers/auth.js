(function(){

  'use strict';

  function AuthCtrl($location, Auth, user) {
    this.user = user;
    this.auth = Auth;
    this.$location = $location;
    this.rootPath = '/';
    if (this.auth.signedIn()) {
      $location.path(this.rootPath);
    }
  }

  AuthCtrl.prototype.login = function () {
    var self = this;
    this.auth.login(this.user).then(function () {
      self.$location.path(self.rootPath);
    }).catch(function (error) {
      self.error = error.toString();
    });
  };

  AuthCtrl.prototype.register = function () {
    var self = this;
    this.auth.register(this.user).then(function () {
      console.log('user created successfully!');
      return self.auth.login(self.user).then(function (authData) {
        console.log('Logged in as:', authData.uid);
        self.$location.path(self.rootPath);
      }).catch(function (error) {
        self.error = error.toString();
      });
    }).catch(function (error) {
      self.error = error.toString();
    });
  };

  app.controller('AuthCtrl', AuthCtrl);

})();
