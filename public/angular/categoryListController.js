/**
 * Controller AS: blc
 *
 * Created by Etherless-Nxzt on 25/12/2016.
 */

function categoryListController($http, $stateParams, $state) {
    var vm = this;

    vm.getAllCategories = function() {
        $http.get('/category/getAllCategories')
            .then(function(response) {
                vm.response = response.data;
            }, function(data) {
                console.log("Error: " +data);
            });
    };

    vm.getCategoriesByParent = function() {
        if(!$stateParams.id) {
            $stateParams.id = 0;
        }
        console.log($stateParams.id)
        $http.get('/category/getCategoriesByParent/' + $stateParams.id)
            .then(function (response) {
                vm.data = response.data;
            }, function (data) {
                console.log("Error: " + data);
            });
    };

    vm.clickCategory = function(idCategory){
        console.log(idCategory);

        $state.go('categoryEdition', {id: idCategory})
    }

}

angular.module('App')
    .controller('categoryListController',['$http', '$stateParams', '$state', categoryListController] );