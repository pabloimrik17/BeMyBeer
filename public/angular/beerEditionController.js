/**
 * Created by Etherless-Nxzt on 25/12/2016.
 */


function beerEditionController($http, $stateParams) {
    var vm = this;

    vm.id = null;
    vm.name = null;
    vm.idCategory = null;
    vm.graduation = null;
    vm.categoryName = null;

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
                alert("OK")
            }, function(data) {
                alert("Error: " +data);
            });
    };

    vm.deleteBeer = function() {
        $http.put('/beer/deleteBeer/'+vm.id)
            .then(function(data) {
                alert("OK")
            }, function(data) {
                alert("Error: " +data);
            });
    };


    vm.submitForm = function(isValid) {
        if(isValid) {
                if(vm.id == null) {
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
    .controller('beerEditionController',['$http', '$stateParams', beerEditionController] );