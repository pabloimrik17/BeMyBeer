/**
 * Created by Etherless-Nxzt on 25/12/2016.
 */

function beerEditionController($scope, $http, $stateParams) {
    var vm = this;

    $scope.beer = {
        Id : 0,
        Name : "",
        IdCategory : 0,
        Graduation : 0,
        CategoryName : ""
    };

    vm.getBeerData = function() {
        $http.get('/beer/getBeer/'+$stateParams.id)
            .then(function(data) {
                var response = data.data[0];
                $beer.Id = response.Id;
                $beer.Name = response.Name;
                $beer.IdCategory = response.IdCategory;
                $beer.Gradutation = response.Gradutation;
                $beer.CategoryName = response.CategoryName;

            }, function(data) {
                console.log("Error: " +data);
            });
    };

    vm.submitForm = function(isValid) {
        if(isValid) {
            alert("OK");
        } else {
            alert("NO OK");
        }
    }

}

angular.module('App')
    .controller('beerEditionController',['$scope', '$http', '$stateParams', beerEditionController] );