/**
 * Controller AS: blc
 *
 * Created by Etherless-Nxzt on 25/12/2016.
 */


function categoryListController($http, $stateParams, $state) {
    var vm = this;

    vm.init = function() {
        vm.availableCategories = [];

        vm.getCategoriesByParent();
    };

    vm.getCategoriesByParent = function() {
        if(!$stateParams.idParent) {
            $stateParams.idParent = 1;
        }

        $http.get('/category/getCategoriesByParent/' + $stateParams.idParent)
            .then(function (response) {
                angular.forEach(response.data, function(category) {
                    var link = '';
                    if(category.childrenCount > 0) {
                        link = 'admin/categories/'+category.id;
                    } else {
                        link = 'admin/categories/'+category.idParent+'/'+category.id;
                    }

                    category.link = link;

                    vm.availableCategories.push(category)
                });

            }, function (data) {
                console.log("Error: " + data);
            });
    };
}

angular.module('App')
    .controller('categoryListController',['$http', '$stateParams', '$state', categoryListController] );