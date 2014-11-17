'use strict';

// The correct post is not being retrieved with the get request!
app.controller('PostViewCtrl', function PostViewCtrl($routeParams, Post) {
  var id = $routeParams.postId;
  console.log(id);
  this.post = Post.get($routeParams.postId);
  //this.post = Post.get($routeParams.postId);
  //this.post = {url:'url here', title:'title here'};
});
