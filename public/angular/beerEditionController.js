/**
 * Created by Etherless-Nxzt on 25/12/2016.
 */


// http://stackoverflow.com/questions/28548263/best-practices-for-creating-crud-services-in-angularjs

function beerEditionController($http, $stateParams, $state) {
    var vm = this;

    vm.reset = function() {
        vm.id = 0;
        vm.name = '';
        vm.idCategory = 1;
        vm.graduation = 0;
        vm.categoryName = '';
    };


    vm.getBeerData = function() {
        if($stateParams.id > 0) {
            $http.get('/beer/getBeer/' + $stateParams.id)
                .then(function (data) {
                    var response = data.data[0];
                    vm.id = response.id;
                    vm.name = response.name;
                    vm.idCategory = response.idCategory;
                    vm.graduation = response.graduation;
                    vm.categoryName = response.categoryName;

                }, function (data) {
                    console.log("Error: " + data);
                });
        }
    };

    vm.insertBeer = function() {
        var beerData = {
            name : vm.name,
            idCategory : vm.idCategory,
            graduation : vm.graduation
        };

        $http.post('/beer/insertBeer', beerData)
            .then(function(data) {
                alert("OK")
            }, function(data) {
                alert("Error: " +data);
            });
    };

    vm.updateBeer = function() {
        var beerData = {
            name : vm.name,
            idCategory : vm.idCategory,
            graduation : vm.graduation
        };

        $http.put('/beer/updateBeer/'+vm.id, beerData)
            .then(function(data) {
                alert("ACTUALIZADO")
            }, function(data) {
                alert("Error: " +data);
            });
    };

    vm.deleteBeer = function() {
        console.log(vm.id);
        $http.delete('/beer/deleteBeer/'+vm.id)
            .then(function(data) {
                alert("BORRADO");
                vm.reset();
                $state.go('beerList');
            }, function(data) {
                alert("Error: " +data);
            });
    };


    vm.submitForm = function(isValid) {
        if(isValid) {
                if(vm.id == 0) {
                    vm.insertBeer(function (data) {
                        alert("OK");
                        console.log(data.data);
                    })
                } else {
                    vm.updateBeer(function(data) {
                        alert("OK");
                        console.log(data);
                    })
                }
        } else {
            alert("ERROR");
        }
    }

}

angular.module('App')
    .controller('beerEditionController',['$http', '$stateParams', '$state', beerEditionController] );