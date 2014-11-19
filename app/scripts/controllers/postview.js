'use strict';

// The correct post is not being retrieved with the get request!
app.controller('PostViewCtrl', function PostViewCtrl($routeParams, Post) {
  this.post = Post.get($routeParams.postId);
});
