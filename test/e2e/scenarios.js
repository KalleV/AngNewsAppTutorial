(function(){

  'use strict';

  describe('AngNews App', function() {

    it('redirects to posts.html if a user tries to register when logged in', function() {
      // TODO: mock user login
      browser.get('/#/register');
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/');
      });
    });

  });

  describe('Login', function() {
    beforeEach(function() {
      browser.get('/#/login');
    });

    it('shows an error if the email doesn\'t exist', function() {
      var errorMessage = element(by.binding('authCtrl.error'));
      expect(errorMessage.getText()).toEqual('');
      var submit = $('#login-submit');
      element(by.model('authCtrl.user.email')).sendKeys('');
      element(by.model('authCtrl.user.password')).sendKeys('');
      submit.click();
      browser.sleep(2000);  // wait for $firebaseAuth to respond
      expect(element(by.binding('authCtrl.error')).getText()).not.toEqual('');
    });
  })

})();
