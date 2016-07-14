angular.module('starter.services', [])

.service('CommonService', [function($http) {
  $http.post('/someUrl', data, config).then(function(res) {

  }, function(error) {});
}])

.service('AlbumService', [function($http) {

}])

.service('PhotoService', [function($http) {

}])

.service('AccountService', function($http) {
  var service = {}
  service.loginfacebook = function(facebookdata, callback) {
    var stringdata = "uid=10000&uname=tommy775&nm=shane&fn=shane&ln=michael&gn=male&bt=12/4/1992&eml=testing@mediasoftpro.com&loc=usa";
    $http.post(
      ' http://staging.vidmoji.com/handlers/signup.ashx?' + stringdata,
      data).then(function(res) {

      callback(res);
      console.log(res);
    }, function(error) {
      var data = {
        status: 'error',
        message: 'Can not connect server. Please try again',
        role: ''
      }
      callback(data);
      console.log(error);

    });
  }

  service.login = function(logindata, callback) {
    var data = {
      UserName: "hieund",
      Password: "nguyenduchieu213"
    };

    $http.post(
      'http://staging.vidmoji.com/api/members/process.ashx?action=login',
      data).then(function(res) {

      callback(res);
      console.log(res);
    }, function(error) {
      var data = {
        status: 'error',
        message: 'Can not connect server. Please try again',
        role: ''
      }
      callback(data);
      console.log(error);

    });

  }

  return service;
});
