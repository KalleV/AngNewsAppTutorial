(function(){

  'use strict';

  app.directive('navBar', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/nav.html',
      controller: function NavCtrl($location, Post, Auth) {
        var self = this;
        this.signedIn = Auth.signedIn;
        this.logout = Auth.logout;
        this.post = {url: 'http://', title: ''};
        this.user = Auth.user;

        this.submitPost = function() {
          self.post.creator = self.user.profile.username;
          self.post.creatorUID = self.user.uid;
          Post.create(self.post).then(function (ref) {
            $location.path('/posts/' + ref.key());
            self.post = {url: 'http://', 'title': ''};
          });
        };

        this.register = function() {
          $location.path('/register');
        };
      },
      controllerAs: 'navCtrl'
    };
  });

})();
