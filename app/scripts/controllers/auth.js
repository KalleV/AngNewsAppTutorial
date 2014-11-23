(function(){

  'use strict';

  function AuthCtrl($location, Auth, user) {
    this.user = user;
    this.auth = Auth;
    this.location = $location;
    this.rootPath = '/';
    if (this.auth.signedIn()) {
      $location.path(this.rootPath);
    }
  }

  AuthCtrl.prototype.login = function () {
    var self = this;
    this.auth.login(this.user).then(function () {
      self.location.path(self.rootPath);
    }).catch(function (error) {
      self.error = error.toString();
    });
  };

  /*
   * @description The register method attempts to create a new user,
   * log them in, and then save the user's profile within the Firebase data store.
   * If the registration fails, an error message is displayed to the user.
   */
  AuthCtrl.prototype.register = function () {
    var self = this;
    this.auth.register(this.user).then(function () {
      console.log('user created successfully!');
      return self.auth.login(self.user).then(function (authData) {
        self.user.uid = authData.uid;
        return self.auth.createProfile(self.user).then(function () {
          console.log('Profile created for user', self.user);
          self.location.path(self.rootPath);
        });
      });
    }).catch(function (error) {
      self.error = error.toString();
    });
  };

  app.controller('AuthCtrl', AuthCtrl);

})();
