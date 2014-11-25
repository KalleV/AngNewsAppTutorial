(function(){

  'use strict';

  function PostViewCtrl($routeParams, Post, Auth) {
    this.post = Post.get($routeParams.postId);
    this.comments = Post.comments($routeParams.postId);
    this.user = Auth.user;
    this.signedIn = Auth.signedIn;
  }

  PostViewCtrl.prototype.addComment = function() {
    if (!this.commentText || this.commentText === '') {
      return;
    }

    var comment = {
      text: this.commentText,
      creator: this.user.profile.username,
      creatorUID: this.user.uid
    };
    this.comments.$add(comment);
    this.commentText = '';
  };

  PostViewCtrl.prototype.deleteComment = function(comment) {
    this.comments.$remove(comment);
  };

  app.controller('PostViewCtrl', PostViewCtrl);

})();
