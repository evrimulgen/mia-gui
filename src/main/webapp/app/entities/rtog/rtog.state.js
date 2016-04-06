(function() {
    'use strict';

    angular
        .module('miaApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('rtog', {
            parent: 'entity',
            url: '/rtog?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.rtog.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/rtog/rtogs.html',
                    controller: 'RtogController',
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
                    $translatePartialLoader.addPart('rtog');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('rtog-detail', {
            parent: 'entity',
            url: '/rtog/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.rtog.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/rtog/rtog-detail.html',
                    controller: 'RtogDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('rtog');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Rtog', function($stateParams, Rtog) {
                    return Rtog.get({id : $stateParams.id});
                }]
            }
        })
        .state('rtog.new', {
            parent: 'rtog',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/rtog/rtog-dialog.html',
                    controller: 'RtogDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                rtogName: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('rtog', null, { reload: true });
                }, function() {
                    $state.go('rtog');
                });
            }]
        })
        .state('rtog.edit', {
            parent: 'rtog',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/rtog/rtog-dialog.html',
                    controller: 'RtogDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Rtog', function(Rtog) {
                            return Rtog.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('rtog', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('rtog.delete', {
            parent: 'rtog',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/rtog/rtog-delete-dialog.html',
                    controller: 'RtogDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Rtog', function(Rtog) {
                            return Rtog.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('rtog', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
