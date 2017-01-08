/**
 * Created by Etherless-Nxzt on 25/12/2016.
 */


function categoryEditionController($http, $stateParams, $state) {
    var vm = this;

    vm.reset = function() {
        vm.id = 0;
        vm.name = '';
        vm.idParent = 1;
        vm.parentName = '';
        vm.categoriesAvailables = [];
    };

    vm.getCategoryData = function() {
        if($stateParams.id > 0) {
            $http.get('/category/getCategory/' + $stateParams.id)
                .then(function (response) {
                    var response = response.data[0];
                    vm.id = response.id;
                    vm.name = response.name;
                    vm.idParent = response.idParent;
                    vm.parentName = response.parentName;

                    vm.getAllCategories();

                }, function (data) {
                    console.log("Error: " + data);
                });
        }
    };

    vm.getAllCategories = function() {
        $http.get('/category/getAllCategories')
            .then(function (response) {
                var data = response.data;
                console.log(JSON.stringify(data));

            }, function (data) {
                console.log("Error: " + data);
            });
    };

    vm.insertCategory = function() {
        var categoryData = {
            name : vm.name,
            idParent : vm.idParent
        };

        $http.post('/category/insertCategory', categoryData)
            .then(function(data) {
                alert("OK")
            }, function(data) {
                alert("Error: " +data);
            });
    };

    vm.updateCategory = function() {
        var categoryData = {
            name : vm.name,
            idParent : vm.idParent
        };

        $http.put('/category/updateCategory/'+vm.id, categoryData)
            .then(function(data) {
                alert("ACTUALIZADO")
            }, function(data) {
                alert("Error: " +data);
            });
    };

    vm.deleteCategory = function() {
        console.log(vm.id);
        $http.delete('/category/deleteCategory/'+vm.id)
            .then(function(data) {
                alert("BORRADO");
                vm.reset();
                $state.go('categoryList');
            }, function(data) {
                alert("Error: " +data);
            });
    };


    vm.submitForm = function(isValid) {
        if(isValid) {
            if(vm.id == 0) {
                vm.insertCategory(function (data) {
                    alert("OK");
                    console.log(data.data);
                })
            } else {
                vm.updateCategory(function(data) {
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
    .controller('categoryEditionController',['$http', '$stateParams', '$state', categoryEditionController] );