(function(){

  'use strict';

  function ProfileCtrl($routeParams, Profile) {
    var self = this;
    var uid = $routeParams.userId;

    this.profile = Profile.get(uid);
    Profile.getPosts(uid).then(function(posts) {
      self.posts = posts;
    });
  }

  app.controller('ProfileCtrl', ProfileCtrl);

})();
