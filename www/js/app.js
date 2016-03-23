
angular.module('starter', ['ionic', 'starter.controllers', 'LocalStorageModule'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            //cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            //cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'AppCtrl'
      })


      .state('app.records', {
          url: '/records',
          views: {
              'menuContent': {
                  templateUrl: 'templates/records.html',
                  controller: 'RecordsCtrl'
              }
          }
      })

    .state('app.analytics', {
        url: '/analytics',
        views: {
            'menuContent': {
                templateUrl: 'templates/analytics.html',
                controller: 'AnalyticsCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/records');
});
