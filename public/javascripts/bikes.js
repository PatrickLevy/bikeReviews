var app = angular.module('Bikes', ['ngResource', 'ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-bike', {
        	templateUrl: 'partials/bike-form.html',
        	controller: 'AddBikeCtrl'
        })
        .when('/bike/:id', {
        	templateUrl: 'partials/bike-show.html',
        	controller: 'EditBikeCtrl'
        })
        .when('/bike/edit/:id', {
        	templateUrl: 'partials/bike-form-edit.html',
        	controller: 'EditBikeCtrl'
        })
        .when('/bike/delete/:id', {
        templateUrl: 'partials/bike-delete.html',
        controller: 'DeleteBikeCtrl'
    	})
        .otherwise({
            redirectTo: '/'
        });
}]);

//Controller for Home View
app.controller('HomeCtrl', ['$scope', '$resource', 
    function($scope, $resource){
    	var Bikes = $resource('/api/bikes');
        Bikes.query(function(bikes){
            $scope.bikes = bikes;
        });
    }]);

//Controller for Add Bike View
app.controller('AddBikeCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            var Bikes = $resource('/api/bikes');
            Bikes.save($scope.bike, function(){
                $location.path('/');
            });
        };
    }]);

//Controller for Edit Bike View
app.controller('EditBikeCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){	
        var Bikes = $resource('/api/bikes/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        //Populate fields of edit page
        Bikes.get({ id: $routeParams.id }, function(bike){
            $scope.bike = bike;
        });

        //click on save
        $scope.save = function(){
            Bikes.update($scope.bike, function(){
                $location.path('/');
            });
        }

        //click on delete
        $scope.delete = function(){
            Bikes.delete({ id: $routeParams.id }, function(bike){
                $location.path('/');
            });
        }
    }]);

