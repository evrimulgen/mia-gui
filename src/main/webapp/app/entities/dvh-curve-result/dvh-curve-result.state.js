(function() {
    'use strict';

    angular
        .module('miaApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('dvh-curve-result', {
            parent: 'entity',
            url: '/dvh-curve-result?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.dvhCurveResult.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dvh-curve-result/dvh-curve-results.html',
                    controller: 'DvhCurveResultController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('dvhCurveResult');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('dvh-curve-result-detail', {
            parent: 'entity',
            url: '/dvh-curve-result/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.dvhCurveResult.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dvh-curve-result/dvh-curve-result-detail.html',
                    controller: 'DvhCurveResultDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('dvhCurveResult');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'DvhCurveResult', function($stateParams, DvhCurveResult) {
                    return DvhCurveResult.get({id : $stateParams.id});
                }]
            }
        })
        .state('dvh-curve-result.new', {
            parent: 'dvh-curve-result',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dvh-curve-result/dvh-curve-result-dialog.html',
                    controller: 'DvhCurveResultDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                version: null,
                                calculationIdentifier: null,
                                patientId: null,
                                planLabel: null,
                                containerId: null,
                                volumeOfInterest: null,
                                error: null,
                                doseSopUid: null,
                                volumeUnit: null,
                                dosevector: null,
                                volumevector: null,
                                binSize: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('dvh-curve-result', null, { reload: true });
                }, function() {
                    $state.go('dvh-curve-result');
                });
            }]
        })
        .state('dvh-curve-result.edit', {
            parent: 'dvh-curve-result',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dvh-curve-result/dvh-curve-result-dialog.html',
                    controller: 'DvhCurveResultDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['DvhCurveResult', function(DvhCurveResult) {
                            return DvhCurveResult.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('dvh-curve-result', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('dvh-curve-result.delete', {
            parent: 'dvh-curve-result',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dvh-curve-result/dvh-curve-result-delete-dialog.html',
                    controller: 'DvhCurveResultDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['DvhCurveResult', function(DvhCurveResult) {
                            return DvhCurveResult.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('dvh-curve-result', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
