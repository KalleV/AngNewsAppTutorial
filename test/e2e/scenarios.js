(function(){

  'use strict';

  describe('AngNews App', function() {

    it('redirects to posts.html if a user tries to register when logged in', function() {
      // TODO: mock user login
      browser.get('app/views/register');
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/');
      });
    });

  });

})();
