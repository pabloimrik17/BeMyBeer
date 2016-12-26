/**
 * Controller AS: blc
 *
 * Created by Etherless-Nxzt on 25/12/2016.
 */

function beerListController($scope, $http, $state) {
    var vm = this;
    vm.loadAllBeers = function() {
        $http.get('/beer/getAllBeers')
            .then(function(data) {
                $scope.response = data;
            }, function(data) {
                console.log("Error: " +data);
            });
    };

    vm.clickBeer = function(idBeer){
        $state.go('beerEdition', {id: idBeer})
    }

}

angular.module('App')
    .controller('beerListController',['$scope' , '$http', '$state', beerListController] );