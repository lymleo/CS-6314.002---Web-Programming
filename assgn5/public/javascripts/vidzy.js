var app = angular.module('Vidzy', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'HomeCtrl'
	})
	.when('/add-video', {
		templateUrl: 'partials/video-form.html',
		controller: 'AddVideoCtrl'
	})
	.when('/video/:id', {
        templateUrl: 'partials/video-form.html',
        controller: 'EditVideoCtrl'
    })
    .when('/video/delete/:id', {
        templateUrl: 'partials/video-delete.html',
        controller: 'DeleteVideoCtrl'
    })
	.otherwise({
		redirectTo: '/'
	});
}]);

app.controller('HomeCtrl', ['$scope', '$resource','$http',
    function ($scope, $resource,$http) {
        angular.element(document).ready(function () {
        var Videos = $resource('/api/videos');
            Videos.query(function(videos){
                $scope.videos = videos;
            });
        })
        }    
]);

app.controller('AddVideoCtrl', ['$scope', '$resource', '$location','$http','$window',
    function($scope, $resource, $location,$http,$window){
        if(!$window.hasLogin) $window.location.href = '/';
        else {
            $scope.title = "Add a video";
            $scope.modelName = true;
            $scope.submit = function(){
                var addVideo = {};
                for(var k in $scope.video) {
                    addVideo[k]=$scope.video[k];
                }
                var formData = new FormData;
                var file = $('#file')[0].files[0]; 
                if(file !== undefined) {
                    formData.append('image',file);
                    $http.post('http://localhost:3000/video/upload',formData, {
                        transformRequest: angular.identity,
                        headers:{
                            'Content-Type':undefined
                        }
                    }).then(function (res){
                        
                    })
                    addVideo.image = file.name;
                }
                var Videos = $resource('/api/videos');
                    Videos.save(addVideo, function(){
                            $location.path('/');
                    });
            };
        }
    }]);

app.controller('EditVideoCtrl', ['$scope', '$resource', '$location', '$routeParams','$http','$window',
    function($scope, $resource, $location, $routeParams,$http,$window){
        if(!$window.hasLogin) $window.location.href = '/';
        else {
            $scope.title = "Edit a video";
            $scope.modelName = true;
            var Videos = $resource('/api/videos/:id', { id: '@_id' }, {
                update: { method: 'PUT' }
            });
            Videos.get({ id: $routeParams.id }, function(video){
                    $scope.video = video;
                }); 
            $scope.submit = function() {
                var editVideo={};
                for(var k in $scope.video) {
                    editVideo[k]=$scope.video[k];
                }
                var formData = new FormData;
                var file = $('#file')[0].files[0]; 
                if(file !== undefined) {
                    formData.append('image',file);
                    $http.post('http://localhost:3000/video/upload',formData, {
                        transformRequest: angular.identity,
                        headers:{
                            'Content-Type':undefined
                        }
                    }).success(function(){
                    });
                    editVideo.image = file.name;
                }
                Videos.update(editVideo, function(){
                            $location.path('/');                    
                        });
            }
        }
    }]);

app.controller('DeleteVideoCtrl', ['$scope', '$resource', '$location', '$routeParams','$window',
    function($scope, $resource, $location, $routeParams,$window){
        if(!$window.hasLogin) $window.location.href = '/';
        $scope.modelName = true;
        var Videos = $resource('/api/videos/:id');
        Videos.get({ id: $routeParams.id }, function(video){
            $scope.video = video;
        })

        $scope.delete = function(){
            Videos.delete({ id: $routeParams.id }, function(video){
                $location.path('/');
            });
        }
    }]);