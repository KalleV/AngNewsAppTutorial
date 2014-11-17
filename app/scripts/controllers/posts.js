'use strict';

app.controller('PostsCtrl', function($location, Post) {
  var vm = this;
  this.posts = Post.get();  // Use a GET request to retrieve all the posts
  this.post = {url: 'http://', title: ''};

  // save a post using a POST request to the backend
  this.submitPost = function() {
    Post.save(vm.post, function(ref) {
      // The success callback saves the submitted post into the controller array
      vm.posts[ref.name] = vm.post;
      vm.post = {url: 'http://', title: ''};
      $location.path('/posts/' + ref.name);
    });
  };
  this.deletePost = function(postId) {
    Post.delete({id: postId}, function() {
      delete vm.posts[postId];
    });
  };
});
