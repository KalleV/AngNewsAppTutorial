(function() {

  'use strict';

  describe('angNewsApp controllers', function () {

    describe('AuthCtrl', function () {

      var $location,
        $q,
        Auth,
        user,
        ctrl;

      beforeEach(module('angNewsApp'));
      //beforeEach(angular.mock.module('angNewsApp'));

      beforeEach(inject(function (_$location_, _Auth_, $controller, _$q_) {
        // mock the services
        $location = _$location_;
        Auth = _Auth_;
        $q = _$q_;

        //Auth.login = function (user) {
        //  var deferred = $q.defer();
        //  return deferred.promise();
        //};

        user = {email: 'email@example.com', password: '123'};
        ctrl = $controller('AuthCtrl', {$location: $location, Auth: Auth, user: user});
      }));

      //it('redirects to the root path if the user is signed in when the controller is constructed', function() {
      //});

      it('redirects to the root path if the user successfully logs in', function() {
        // Auth login returns a promise '$$state' object with a status of 1 on
        // success and a value of an Object with data such as the provider.
        spyOn(Auth, 'login').and.callFake(function() {
          var deferred = $q.defer();
          return deferred.promise;
        });
        //spyOn(ctrl.location, 'path').and.callFake(function(newPath) {
        //  return '/';
        //});
        ctrl.login();
        expect(Auth.login).toHaveBeenCalled();
        //expect(ctrl.location.path).toHaveBeenCalled();
        expect(ctrl.rootPath).toEqual('/');
      });

    });

  });

})();
