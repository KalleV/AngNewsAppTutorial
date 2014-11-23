/* global app: true */
/* exported app */

'use strict';

/**
 * @ngdoc overview
 * @name angNewsApp
 * @description
 * # angNewsApp
 *
 * Main module of the application.
 */
var app = angular.module('angNewsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'angular-md5'
])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
      .when('/posts/:postId', {
        templateUrl: 'views/showpost.html',
        controller: 'PostViewCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controllerAs: 'authCtrl',
        controller: 'AuthCtrl',
        resolve: {
          user: function(Auth) {
            return Auth.currentUser();
          }
        }
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controllerAs: 'authCtrl',
        controller: 'AuthCtrl',
        resolve: {  // injects the currently signed in user to the controller
          user: function(Auth) {

            console.log('Route Provider Auth current user',
                        Auth.currentUser()
            );

            return Auth.currentUser();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('FIREBASE_URL', 'https://radiant-fire-943.firebaseio.com/');
