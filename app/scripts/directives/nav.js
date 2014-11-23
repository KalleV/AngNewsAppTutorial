(function(){

  'use strict';

  app.directive('navBar', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/nav.html',
      controller: function ($location, Post, Auth) {
        var vm = this;

        this.signedIn = Auth.signedIn;
        this.logout = Auth.logout;
        this.post = {url: 'http://', title: ''};
        this.user = Auth.user;

        this.submitPost = function () {
          Post.create(vm.post).then(function (ref) {
            $location.path('/posts/' + ref.key());
            vm.post = {url: 'http://', 'title': ''};
          });
        };

        this.register = function () {
          $location.path('/register');
        };
      },
      controllerAs: 'navCtrl'
    };
  });

})();
