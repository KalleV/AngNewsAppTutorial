(function(){

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
          console.log(postRef, postRef.key());
          $firebase(ref.child('user_posts').child(post.creatorUID))
            .$push(postRef.key());
          return postRef;
        });
      },
      get: function(postId) {
        return $firebase(ref.child('posts').child(postId)).$asObject();
      },
      delete: function(post) {
        // Remove all comments linked to the post
        $firebase(ref.child('comments').child(post.$id)).$remove();

        // Remove the secondary id linked to the post
        var userPosts = $firebase(ref.child('user_posts').child(post.creatorUID));
        userPosts.$asArray().$loaded().then(function(data) {
            data.$remove(data.$indexFor(post.$id));
            for (var i = 0; i < data.length; i++) {
              if (data[i].$value === post.$id) {
                data.$remove(i);
              }
            }
          });
        return posts.$remove(post);
      }
    };
  });

})();
