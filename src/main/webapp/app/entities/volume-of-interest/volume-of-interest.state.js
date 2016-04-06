(function() {
    'use strict';

    angular
        .module('miaApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('volume-of-interest', {
            parent: 'entity',
            url: '/volume-of-interest?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.volumeOfInterest.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/volume-of-interest/volume-of-interests.html',
                    controller: 'VolumeOfInterestController',
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
                    $translatePartialLoader.addPart('volumeOfInterest');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('volume-of-interest-detail', {
            parent: 'entity',
            url: '/volume-of-interest/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.volumeOfInterest.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/volume-of-interest/volume-of-interest-detail.html',
                    controller: 'VolumeOfInterestDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('volumeOfInterest');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'VolumeOfInterest', function($stateParams, VolumeOfInterest) {
                    return VolumeOfInterest.get({id : $stateParams.id});
                }]
            }
        })
        .state('volume-of-interest.new', {
            parent: 'volume-of-interest',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/volume-of-interest/volume-of-interest-dialog.html',
                    controller: 'VolumeOfInterestDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('volume-of-interest', null, { reload: true });
                }, function() {
                    $state.go('volume-of-interest');
                });
            }]
        })
        .state('volume-of-interest.edit', {
            parent: 'volume-of-interest',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/volume-of-interest/volume-of-interest-dialog.html',
                    controller: 'VolumeOfInterestDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['VolumeOfInterest', function(VolumeOfInterest) {
                            return VolumeOfInterest.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('volume-of-interest', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('volume-of-interest.delete', {
            parent: 'volume-of-interest',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/volume-of-interest/volume-of-interest-delete-dialog.html',
                    controller: 'VolumeOfInterestDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['VolumeOfInterest', function(VolumeOfInterest) {
                            return VolumeOfInterest.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('volume-of-interest', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
