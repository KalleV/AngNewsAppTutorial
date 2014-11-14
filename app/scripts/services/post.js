// https://radiant-fire-943.firebaseio.com/
'use strict';

app.factory('Post', function($resource) {
  return $resource('https://radiant-fire-943.firebaseio.com/posts/:id.json');
});
