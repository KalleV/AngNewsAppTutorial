'use strict';

describe('angNewsApp controllers', function() {

  describe('AuthCtrl', function() {

    var $location,
        Auth,
        user,
        ctrl;

    beforeEach(module('angNewsApp'));

    beforeEach(inject(function (_$location_, Auth, user, $controller, $q) {
      // mock the services
      $location = _$location_;
      Auth = _Auth_;
    //
    //  Auth.login = function(user) {
    //    var deferred = $q.defer();
    //    var success = {$$state: {status: 0}};
    //    deferred.resolve(success);
    //    return deferred.promise();
    //  };
    //
    //  user = {email: 'email@example.com', password: '123'};
    //  //spyOn(Auth, 'login').andReturn(
    //  //  $q.when({
    //  //  })
    //  //);
    //
    //  // ($location, Auth, user)
    //  ctrl = $controller(AuthCtrl, {$location: $location, Auth: Auth, user: user});
    //
    }));

    //it('redirects to the root path if the user is signed in when the controller is constructed', function() {
    //});

    it('redirects to the root path if the user successfully logs in', function() {
      //ctrl.login(user);
      //expect(ctrl.location.path).toHaveBeenCalled();
    });

//    ($location, Auth, user)
//    AuthCtrl.prototype.login = function() {
//      var self = this;
//      this.auth.login(this.user).then(function() {
//        self.location.path(self.rootPath);
//      }).catch(function (error) {
//        self.error = error.toString();
//      });
//    };

  });

});
