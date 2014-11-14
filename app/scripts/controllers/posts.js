'use strict';

app.controller('PostsCtrl', function() {
  var vm = this;
  this.posts = [];
  this.post = {url: 'http://', title: ''};

  this.submitPost = function() {
    vm.posts.push(vm.post);
    vm.post = {url: 'http://', title: ''};
  };
  this.deletePost = function(index) {
    vm.posts.splice(index, 1);
  };
});
