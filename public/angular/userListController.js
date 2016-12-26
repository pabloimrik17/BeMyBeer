/**
 * Created by Etherless-Nxzt on 25/12/2016.
 */

function userListController($scope, $http) {

    $scope.loadUsers = function() {
        $http.get('/users/getUsers')
            .then(function(data) {
                $scope.response = data;
            },function(data){
                console.log('Error: ' + data);
            });
    };

    $scope.clickButton = function(){
        var userData = {
            username : $scope.username,
            email : $scope.email,
            password : $scope.password
        };

        $http.post('/users', userData)
            .then(function(data) {
                $scope.response = data;
                $scope.loadUsers();
            }, function(data) {
                console.log('Error: ' + data);
            });
    };
}

angular.module('App')
    .controller('userListController',['$scope', '$http', userListController] );