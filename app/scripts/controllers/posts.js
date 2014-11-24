(function(){

  'use strict';

  app.controller('PostsCtrl', function ($location, Post, Auth) {
    this.posts = Post.all;
    this.user = Auth.user;
    this.post = {url: 'http://', title: ''};
    this.deletePost = function (post) {
      Post.delete(post);
    };
  });

})();
