(function(){

  // https://radiant-fire-943.firebaseio.com/
  'use strict';

  app.service('Post', function Post($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL);
    var posts = $firebase(ref.child('posts')).$asArray();

    return {
      all: posts,
      comments: function(postId) {
        return $firebase(ref.child('comments').child(postId)).$asArray();
      },
      create: function(post) {
        return posts.$add(post).then(function(postRef) {
          $firebase(ref.child('user_posts').child(post.creatorUID))
            .$push(postRef.key());
          return postRef;
        });
      },
      get: function(postId) {
        return $firebase(ref.child('posts').child(postId)).$asObject();
      },
      // TODO: remove the post from user_posts in the data store too
      delete: function(post) {
        return posts.$remove(post);
      }
    };
  });

})();
