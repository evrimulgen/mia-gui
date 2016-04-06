(function() {
    'use strict';

    angular
        .module('miaApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('computation', {
            parent: 'entity',
            url: '/computation?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.computation.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/computation/computations.html',
                    controller: 'ComputationController',
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
                    $translatePartialLoader.addPart('computation');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('computation-detail', {
            parent: 'entity',
            url: '/computation/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.computation.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/computation/computation-detail.html',
                    controller: 'ComputationDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('computation');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Computation', function($stateParams, Computation) {
                    return Computation.get({id : $stateParams.id});
                }]
            }
        })
        .state('computation.new', {
            parent: 'computation',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/computation/computation-dialog.html',
                    controller: 'ComputationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                computationIdentifier: null,
                                config: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('computation', null, { reload: true });
                }, function() {
                    $state.go('computation');
                });
            }]
        })
        .state('computation.edit', {
            parent: 'computation',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/computation/computation-dialog.html',
                    controller: 'ComputationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Computation', function(Computation) {
                            return Computation.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('computation', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('computation.delete', {
            parent: 'computation',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/computation/computation-delete-dialog.html',
                    controller: 'ComputationDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Computation', function(Computation) {
                            return Computation.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('computation', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
