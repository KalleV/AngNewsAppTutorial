(function() {

  'use strict';

  describe('angNewsApp controllers', function () {

    describe('AuthCtrl', function () {

      var $location,
          $q,
          $rootScope,
          $controller,
          AuthMock,
          deferred,
          user,
          ctrl,
          loginError;

      beforeEach(module('angNewsApp'));

      beforeEach(function() {
        AuthMock = {
          login: function(user) {
            deferred = $q.defer();
            return deferred.promise;
          },
          signedIn: function() {
            return false;
          }
        }
      });

      beforeEach(inject(function (_$location_, _$controller_, _$rootScope_, _$q_) {
        $location = _$location_;
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $q = _$q_;

        loginError = 'Error: Failed to log in';
        user = {email: 'email@example.com', password: '123'};
        ctrl = $controller('AuthCtrl', {$location: $location, Auth: AuthMock, user: user});
      }));

      it('redirects to the root path for signed in users when the controller is constructed', function() {
        expect($location.path()).toBe('');
        spyOn(AuthMock, 'signedIn').and.returnValue(true);
        // construct a new controller in order to test the constructor's redirect
        var ctrl = $controller('AuthCtrl', {$location: $location, Auth: AuthMock, user: user});
        expect($location.path()).toBe(ctrl.rootPath);
      });

      it('does not redirect to the root path for logged out users when the controller is constructed', function() {
        expect($location.path()).toBe('');
        spyOn(AuthMock, 'signedIn').and.returnValue(false);
        var ctrl = $controller('AuthCtrl', {$location: $location, Auth: AuthMock, user: user});
        expect($location.path()).toBe('');
      });

      it('redirects to the root path if the user successfully logs in', function() {
        expect($location.path()).toBe('');
        spyOn(AuthMock, 'login').and.callThrough();
        ctrl.login();
        deferred.resolve();
        $rootScope.$apply();  // apply the changes to the scope
        expect(AuthMock.login).toHaveBeenCalledWith(user);
        expect($location.path()).toBe(ctrl.rootPath);
      });

      it('does not redirect to the root path if the user fails to log in', function() {
        expect($location.path()).toBe('');
        spyOn(AuthMock, 'login').and.callThrough();
        ctrl.login();
        deferred.reject(loginError);
        $rootScope.$apply();
        expect(AuthMock.login).toHaveBeenCalledWith(user);
        expect($location.path()).toBe('');
      });

      it('creates an error message if the user fails to log in', function() {
        expect(ctrl.error).toBeUndefined();
        spyOn(AuthMock, 'login').and.callThrough();
        ctrl.login();
        deferred.reject(loginError);
        $rootScope.$apply();
        expect(ctrl.error).toBeDefined();
        expect(ctrl.error).toEqual(loginError);
      });

    });

  });

})();
