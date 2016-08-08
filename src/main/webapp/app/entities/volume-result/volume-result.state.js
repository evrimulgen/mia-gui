(function() {
    'use strict';

    angular
        .module('miaApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('volume-result', {
            parent: 'result',
            url: '/volume-result?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.volumeResult.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/volume-result/volume-results.html',
                    controller: 'VolumeResultController',
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
                    $translatePartialLoader.addPart('volumeResult');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('volume-result-detail', {
            parent: 'entity',
            url: '/volume-result/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.volumeResult.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/volume-result/volume-result-detail.html',
                    controller: 'VolumeResultDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('volumeResult');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'VolumeResult', function($stateParams, VolumeResult) {
                    return VolumeResult.get({id : $stateParams.id});
                }]
            }
        })
        .state('volume-result.new', {
            parent: 'volume-result',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/volume-result/volume-result-dialog.html',
                    controller: 'VolumeResultDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                doseSopUid: null,
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
                    $state.go('volume-result', null, { reload: true });
                }, function() {
                    $state.go('volume-result');
                });
            }]
        })
        .state('volume-result.edit', {
            parent: 'volume-result',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/volume-result/volume-result-dialog.html',
                    controller: 'VolumeResultDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['VolumeResult', function(VolumeResult) {
                            return VolumeResult.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('volume-result', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('volume-result.delete', {
            parent: 'volume-result',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/volume-result/volume-result-delete-dialog.html',
                    controller: 'VolumeResultDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['VolumeResult', function(VolumeResult) {
                            return VolumeResult.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('volume-result', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
