/**
 * Controller AS: blc
 *
 * Created by Etherless-Nxzt on 25/12/2016.
 */

function beerListController($http, $state) {
    var vm = this;

    vm.loadAllBeers = function() {
        $http.get('/beer/getAllBeers')
            .then(function(response) {
                vm.data = response.data;
            }, function(data) {
                console.log("Error: " +data);
            });
    };

    vm.newBeer = function(){
        $state.go('beerEdition')
    }

}

angular.module('App')
    .controller('beerListController',['$http', '$state', beerListController] );