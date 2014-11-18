'use strict';

app.controller('PostsCtrl', function($location, Post) {
  this.posts = Post.all;
  this.post = {url: 'http://', title: ''};
  this.deletePost = function(post) {
    Post.delete(post);
  };
});
