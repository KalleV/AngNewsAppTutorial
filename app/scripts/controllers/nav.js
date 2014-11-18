'use strict';

app.controller('NavCtrl', function($location, Post, Auth) {
  var vm = this;

  this.signedIn = Auth.signedIn;
  this.logout = Auth.logout;
  this.post = {url: 'http://', title: ''};

  this.submitPost = function() {
    Post.create(vm.post).then(function(ref) {
      $location.path('/posts/' + ref.name());
      vm.post = {url: 'http://', 'title': ''};
    });
  };
});
