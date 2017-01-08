/**
 * Created by Etherless-Nxzt on 25/12/2016.
 */

function routes($stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('beerList',{
            url: '/admin/beers',
            templateUrl: '/template/beers',
            controller: "beerListController",
            controllerAs : "blc"
        })
        .state('beerEdition',{
            url: '/admin/beer/:id',
            templateUrl: '/template/beerEdition',
            controller : "beerEditionController",
            controllerAs : "bec"
        })
        .state('categoryList',{
            url: '/admin/categories/:id',
            templateUrl: '/template/categories',
            controller: "categoryListController",
            controllerAs : "clc"
        })
        .state('categoryEdition',{
            url: '/admin/category/:id',
            templateUrl: '/template/categoryEdition',
            controller : "categoryEditionController",
            controllerAs : "cec"
        });
}

angular.module('App').config(['$stateProvider', '$locationProvider',
    routes]);