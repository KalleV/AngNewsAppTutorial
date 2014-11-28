(function() {

  'use strict';

  describe('angNewsApp controllers', function() {

    describe('PostViewCtrl', function() {

      var firebaseArrayMock,
          AuthMock,
          PostMock,
          postViewCtrlMock,
          $controller,
          routeParamsMock;

      var post = {
        $id: '-rj15aBrMn49C-e',
        title: 'A title',
        url: 'A url'
      };

      var user = {
        email: 'email@example.com',
        password: '123',
        uid: 123456,
        profile: {
          username: 'Jeb Smith'
        }
      };

      beforeEach(module('angNewsApp'));

      beforeEach(function() {
        firebaseArrayMock = function() {
          this.data = [];
          this.$add = function(item) { };
          this.$remove = function(item) { };
        };

        PostMock = {
          get: function(postId) {
            return post;
          },
          comments: function(postId) {
            return new firebaseArrayMock();
          }
        };

        AuthMock = {
          user: user,
          signedIn: function() {
            return true;
          }
        };

        routeParamsMock = {
          postId: 12345679
        };
      });

      beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
        postViewCtrlMock = $controller('PostViewCtrl', {
            $routeParams: routeParamsMock,
            Post: PostMock,
            Auth: AuthMock
        });
      }));

      it('it retrieves a post and a list of comments if they exist', function() {
        expect(postViewCtrlMock.post).toBeDefined();
        expect(postViewCtrlMock.comments).toBeDefined();
      });

      it('does not store empty comments or undefined comments', function() {
        spyOn(postViewCtrlMock.comments, '$add');
        postViewCtrlMock.commentText = '';
        postViewCtrlMock.addComment();
        postViewCtrlMock.commentText = undefined;
        postViewCtrlMock.addComment();

        expect(postViewCtrlMock.comments.$add).not.toHaveBeenCalled();
      });

      it('calls $add when adding non-empty comments', function() {
        spyOn(postViewCtrlMock.comments, '$add');
        postViewCtrlMock.commentText = 'First!';
        postViewCtrlMock.addComment();

        expect(postViewCtrlMock.comments.$add).toHaveBeenCalled();
        expect(postViewCtrlMock.commentText).toBe('');
      });

      it('calls $remove when deleting a comment', function() {
        spyOn(postViewCtrlMock.comments, '$remove');
        postViewCtrlMock.commentText = 'First!';
        postViewCtrlMock.user.profile.username = 'JimSmith';
        postViewCtrlMock.user.uid = 12345;
        postViewCtrlMock.addComment();
        var comment = {
          text: 'First!',
          creator: AuthMock.user.profile.username,
          creatorUID: AuthMock.user.uid
        };
        postViewCtrlMock.deleteComment(comment);

        expect(postViewCtrlMock.comments.$remove).toHaveBeenCalledWith(comment);
      });

    });

    describe('AuthCtrl', function() {

      var $location,
        $q,
        $rootScope,
        $controller,
        AuthMock,
        loginDeferred,
        registerDeferred,
        createProfileDeferred,
        user,
        mockUID,
        ctrl,
        loginError,
        registerError;

      beforeEach(module('angNewsApp'));

      beforeEach(function () {
        mockUID = {uid: 12345};

        AuthMock = {
          login: function (user) {
            loginDeferred = $q.defer();
            return loginDeferred.promise;
          },
          signedIn: function () {
            return false;
          },
          register: function (user) {
            registerDeferred = $q.defer();
            return registerDeferred.promise;
          },
          createProfile: function (user) {
            createProfileDeferred = $q.defer();
            return createProfileDeferred.promise;
          }
        }
      });

      beforeEach(inject(function(_$location_, _$controller_, _$rootScope_, _$q_) {
        $location = _$location_;
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $q = _$q_;

        loginError = 'Error: Failed to log in';
        registerError = 'Error: Failed to register';
        user = {email: 'email@example.com', password: '123'};
        ctrl = $controller('AuthCtrl', {$location: $location, Auth: AuthMock, user: user});
      }));

      describe('AuthCtrl: constructor', function() {

        it('has an empty current url when the user is not signed in', function () {
          expect($location.path()).toBe('');
        });

        it('redirects to the root path for signed in users when the controller is constructed', function () {
          spyOn(AuthMock, 'signedIn').and.returnValue(true);
          // construct a new controller in order to test the constructor's redirect
          var ctrl = $controller('AuthCtrl', {$location: $location, Auth: AuthMock, user: user});
          expect($location.path()).toBe(ctrl.rootPath);
        });

        it('does not redirect to the root path for logged out users when the controller is constructed', function () {
          spyOn(AuthMock, 'signedIn').and.returnValue(false);
          $controller('AuthCtrl', {$location: $location, Auth: AuthMock, user: user});
          expect($location.path()).toBe('');
        });

      });

      describe('AuthCtrl: login', function() {

        beforeEach(function() {
          spyOn(AuthMock, 'login').and.callThrough();
        });

        it('redirects to the root path if the user successfully logs in', function() {
          ctrl.login();
          loginDeferred.resolve();
          $rootScope.$apply();

          expect(AuthMock.login).toHaveBeenCalledWith(user);
          expect($location.path()).toBe(ctrl.rootPath);
        });

        it('does not redirect to the root path if the user fails to log in', function() {
          ctrl.login();
          loginDeferred.reject(loginError);
          $rootScope.$apply();

          expect(AuthMock.login).toHaveBeenCalledWith(user);
          expect($location.path()).toBe('');
        });

        it('creates an error message if the user fails to log in', function() {
          expect(ctrl.error).toBeUndefined();
          ctrl.login();
          loginDeferred.reject(loginError);
          $rootScope.$apply();

          expect(ctrl.error).toBeDefined();
          expect(ctrl.error).toEqual(loginError);
        });

      });

      describe('AuthCtrl: register', function() {

        beforeEach(function() {
          spyOn(AuthMock, 'register').and.callThrough();
          spyOn(AuthMock, 'login').and.callThrough();
          spyOn(AuthMock, 'createProfile').and.callThrough();
          ctrl.register();
        });

        it('logs the user in if registration is successful', function() {
          registerDeferred.resolve();
          $rootScope.$apply();
          loginDeferred.resolve(mockUID);
          $rootScope.$apply();

          expect(AuthMock.register).toHaveBeenCalledWith(user);
          expect(AuthMock.login).toHaveBeenCalledWith(user);
          expect(ctrl.error).toBeUndefined();
        });

        it('redirects the user to the base path if all 3 registration steps are successful', function() {
          registerDeferred.resolve();
          $rootScope.$apply();
          loginDeferred.resolve(mockUID);
          $rootScope.$apply();
          createProfileDeferred.resolve();
          $rootScope.$apply();

          expect(AuthMock.register).toHaveBeenCalledWith(user);
          expect(AuthMock.login).toHaveBeenCalledWith(user);
          expect(AuthMock.createProfile).toHaveBeenCalledWith(user);
          expect(ctrl.error).toBeUndefined();
          expect($location.path()).toBe(ctrl.rootPath);
        });

        it('creates an error message if registration fails', function() {
          expect(ctrl.error).toBeUndefined();
          registerDeferred.reject(registerError);
          $rootScope.$apply();
          loginDeferred.resolve(mockUID);
          $rootScope.$apply();
          createProfileDeferred.resolve();
          $rootScope.$apply();

          expect(AuthMock.register).toHaveBeenCalledWith(user);
          expect(AuthMock.login).not.toHaveBeenCalled();
          expect(ctrl.error).toBeDefined();
          expect(ctrl.error).toEqual(registerError);
        });

        it('creates an error message if login fails after registration fails', function() {
          registerDeferred.resolve();
          $rootScope.$apply();
          loginDeferred.reject(loginError);
          $rootScope.$apply();

          expect(ctrl.error).toBeDefined();
          expect(ctrl.error).toEqual(loginError);
        });

      });

    });

  });

})();
