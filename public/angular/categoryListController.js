/**
 * Controller AS: blc
 *
 * Created by Etherless-Nxzt on 25/12/2016.
 */

function categoryListController($state, $http) {
    var vm = this;

    vm.loadAllCategories = function() {
        $http.get('/getAllCategories')
            .then(function(data) {
                console.log(data);
                vm.response = data;
            }, function(data) {
                console.log("Error: " +data);
            });
    };


    vm.clickCategory = function(idBeer){
        console.log(idBeer);

        $state.go('categoryEdition', {id: idBeer})
    }

}

angular.module('App')
    .controller('categoryListController',['$http', '$scope', '$state', categoryListController] );