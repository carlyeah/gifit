var gifItApp = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services']);

gifItApp.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

gifItApp.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);


gifItApp.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which usesstate the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

        // setup an abstract state for the tabs directive
        .state('grid', {
            url: '/',
            templateUrl: 'partials/gif-grid.html',
            controller: 'GridCtrl'
        })

        .state('detail', {
            url: '/detail/:gifId',
            templateUrl: 'partials/gif-detail.html',
            controller: 'DetailCtrl'
        })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

});
