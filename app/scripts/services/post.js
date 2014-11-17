// https://radiant-fire-943.firebaseio.com/
'use strict';

app.factory('Post', function Post(FIREBASE_URL, $resource) {
  return $resource(FIREBASE_URL);
});
