/**
 * Created by Etherless-Nxzt on 25/12/2016.
 */

function categoryEditionController($stateParams) {
    var vm = this;

    console.log($stateParams.id)

}

angular.module('App')
    .controller('categoryEditionController',['$stateParams', categoryEditionController] );