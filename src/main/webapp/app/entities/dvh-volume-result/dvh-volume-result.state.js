(function() {
    'use strict';

    angular
        .module('miaApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('dvh-volume-result', {
            parent: 'entity',
            url: '/dvh-volume-result?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.dvhVolumeResult.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dvh-volume-result/dvh-volume-results.html',
                    controller: 'DvhVolumeResultController',
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
                    $translatePartialLoader.addPart('dvhVolumeResult');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('dvh-volume-result-detail', {
            parent: 'entity',
            url: '/dvh-volume-result/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.dvhVolumeResult.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dvh-volume-result/dvh-volume-result-detail.html',
                    controller: 'DvhVolumeResultDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('dvhVolumeResult');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'DvhVolumeResult', function($stateParams, DvhVolumeResult) {
                    return DvhVolumeResult.get({id : $stateParams.id});
                }]
            }
        })
        .state('dvh-volume-result.new', {
            parent: 'dvh-volume-result',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dvh-volume-result/dvh-volume-result-dialog.html',
                    controller: 'DvhVolumeResultDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                doseSopUid: null,
                                boundary: null,
                                volumeUnit: null,
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
                    $state.go('dvh-volume-result', null, { reload: true });
                }, function() {
                    $state.go('dvh-volume-result');
                });
            }]
        })
        .state('dvh-volume-result.edit', {
            parent: 'dvh-volume-result',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dvh-volume-result/dvh-volume-result-dialog.html',
                    controller: 'DvhVolumeResultDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['DvhVolumeResult', function(DvhVolumeResult) {
                            return DvhVolumeResult.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('dvh-volume-result', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('dvh-volume-result.delete', {
            parent: 'dvh-volume-result',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dvh-volume-result/dvh-volume-result-delete-dialog.html',
                    controller: 'DvhVolumeResultDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['DvhVolumeResult', function(DvhVolumeResult) {
                            return DvhVolumeResult.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('dvh-volume-result', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
