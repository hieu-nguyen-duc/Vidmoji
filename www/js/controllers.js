angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state) {

  $scope.goToPage = function(pageName) {
    $state.go('app.' + pageName);
  };

})

.controller('LoginCtrl', function($scope, $ionicSideMenuDelegate, $state, AccountService) {
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.login = function() {
    var data = {};
    AccountService.login(data, function() {
      
    });
  };

  $scope.goSettings = function() {
    $state.go('app.settings');
  };
})

.controller('SettingsCtrl', function($scope, $ionicSideMenuDelegate, $state) {
  $ionicSideMenuDelegate.canDragContent(true);

  $scope.goHome = function() {
    $state.go('app.home');
  };
})

.controller('HomeCtrl', function($scope, $ionicSideMenuDelegate) {
  $ionicSideMenuDelegate.canDragContent(true);
})

.controller('ProfileCtrl', function($scope, $ionicSideMenuDelegate) {
  $ionicSideMenuDelegate.canDragContent(true);
})

.controller('UploadCtrl', function($scope, $ionicSideMenuDelegate) {
  $ionicSideMenuDelegate.canDragContent(true);
})

;
