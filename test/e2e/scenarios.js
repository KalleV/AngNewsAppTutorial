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

    // TODO: add delay to wait for the controller response before checking for the error message
    it('shows an error if the email doesn\'t exist', function() {
      var errorMessage = element(by.binding('authCtrl.error'));
      expect(errorMessage.getText()).toEqual('');
      var submit = $('#login-submit');
      element(by.model('authCtrl.user.email')).sendKeys('');
      element(by.model('authCtrl.user.password')).sendKeys('');
      submit.click();
      var error = element(by.className('error'));
      expect(error.getAttribute('class')).not.toMatch('ng-hide');
//      expect(element(by.tagName('.p')).isDisplayed()).toBeTruthy();
      //browser.findElement(by.binding('authCtrl.error')).then(function(elt) {
      //browser.findElement(by.css('.p')).then(function(elt) {
      //  expect(elt.evaluate('authCtrl.error'))
      //    .toEqual('Error: The specified email address is incorrect.');
      //});
      //expect(element(by.binding('authCtrl.error')).getText()).not.toEqual('');
    });
  })

})();
