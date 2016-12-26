/**
 * Created by Etherless-Nxzt on 25/12/2016.
 */

function beerEditionController($scope, $http, $stateParams) {
    var vm = this;

    vm.getBeerData = function() {
        $http.get('/beer/getBeer/'+$stateParams.id)
            .then(function(data) {
                var response = data.data[0];
                $scope.Id = response.Id;
                $scope.Name = response.Name;
                $scope.IdCategory = response.IdCategory;
                $scope.Gradutation = response.Gradutation;
                $scope.CategoryName = response.CategoryName;

            }, function(data) {
                console.log("Error: " +data);
            });
    };

}

angular.module('App')
    .controller('beerEditionController',['$scope', '$http', '$stateParams', beerEditionController] );