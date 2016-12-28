/**
 * Created by Etherless-Nxzt on 25/12/2016.
 */

function beerEditionController($http, $stateParams) {
    var vm = this;


    vm.getBeerData = function() {
        $http.get('/beer/getBeer/'+$stateParams.id)
            .then(function(data) {
                var response = data.data[0];
                console.log(response);
                vm.Id = response.Id;
                vm.Name = response.Name;
                vm.IdCategory = response.IdCategory;
                vm.Graduation = response.Graduation;
                vm.CategoryName = response.CategoryName;

            }, function(data) {
                console.log("Error: " +data);
            });
    };

    vm.insertBeer = function() {
        var beerData = {
            Name : vm.Name,
            IdCategory : vm.IdCategory,
            Graduation : vm.Graduation
        };

        $http.post('/beer/insertBeer', beerData)
            .then(function(data) {
                console.log("OK");
            }, function(data) {
                console.log("Error: " +data);
            });
    };

    vm.submitForm = function(isValid) {
        if(isValid) {
            vm.insertBeer(function() {
                alert("OK");
            })
        } else {
            alert("ERROR");
        }
    }

}

angular.module('App')
    .controller('beerEditionController',['$http', '$stateParams', beerEditionController] );