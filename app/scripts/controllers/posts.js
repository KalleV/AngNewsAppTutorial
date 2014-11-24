(function(){

  'use strict';

  function PostsCtrl($location, Post, Auth) {
    this.authService = Auth;
    this.postService = Post;
    this.posts = Post.all;
    this.user = Auth.user;
    this.post = {url: 'http://', title: ''};
  }

  PostsCtrl.prototype.deletePost = function(post) {
    this.postService.delete(post);
  };

  PostsCtrl.prototype.postAuthor = function(post) {
    return this.user.uid === post.creatorUID;
  };

  app.controller('PostsCtrl', PostsCtrl);

})();
