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
        this.user = Auth.user;  // TODO: user name is not visible in the view

        console.log('NavCtrl user', this.user); // DEBUG
        console.log(this.signedIn());           // DEBUG

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
