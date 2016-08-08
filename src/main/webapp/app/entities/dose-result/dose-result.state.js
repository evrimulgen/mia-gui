(function() {
    'use strict';

    angular
        .module('miaApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('dose-result', {
            parent: 'result',
            url: '/dose-result?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.doseResult.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dose-result/dose-results.html',
                    controller: 'DoseResultController',
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
                    $translatePartialLoader.addPart('doseResult');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('dose-result-detail', {
            parent: 'entity',
            url: '/dose-result/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.doseResult.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dose-result/dose-result-detail.html',
                    controller: 'DoseResultDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('doseResult');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'DoseResult', function($stateParams, DoseResult) {
                    return DoseResult.get({id : $stateParams.id});
                }]
            }
        })
        .state('dose-result.new', {
            parent: 'dose-result',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dose-result/dose-result-dialog.html',
                    controller: 'DoseResultDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                doseSopUid: null,
                                operation: null,
                                result: null,
                                version: null,
                                calculationIdentifier: null,
                                patientId: null,
                                planLabel: null,
                                containerId: null,
                                volumeOfInterest: null,
                                error: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('dose-result', null, { reload: true });
                }, function() {
                    $state.go('dose-result');
                });
            }]
        })
        .state('dose-result.edit', {
            parent: 'dose-result',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dose-result/dose-result-dialog.html',
                    controller: 'DoseResultDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['DoseResult', function(DoseResult) {
                            return DoseResult.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('dose-result', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('dose-result.delete', {
            parent: 'dose-result',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dose-result/dose-result-delete-dialog.html',
                    controller: 'DoseResultDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['DoseResult', function(DoseResult) {
                            return DoseResult.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('dose-result', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
