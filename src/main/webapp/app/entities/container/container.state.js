(function() {
    'use strict';

    angular
        .module('miaApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('container', {
            parent: 'entity',
            url: '/container?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.container.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/container/containers.html',
                    controller: 'ContainerController',
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
                    $translatePartialLoader.addPart('container');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('container-detail', {
            parent: 'entity',
            url: '/container/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.container.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/container/container-detail.html',
                    controller: 'ContainerDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('container');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Container', function($stateParams, Container) {
                    return Container.get({id : $stateParams.id});
                }]
            }
        })
        .state('container.new', {
            parent: 'container',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/container/container-dialog.html',
                    controller: 'ContainerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                containerStatus: null,
                                patientId: null,
                                userId: null,
                                providerId: null,
                                configurationId: null,
                                calculationId: null,
                                configurationJson: null,
                                dicomPackageEntity: null,
                                mappingRtogRoi: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('container', null, { reload: true });
                }, function() {
                    $state.go('container');
                });
            }]
        })
        .state('container.edit', {
            parent: 'container',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/container/container-dialog.html',
                    controller: 'ContainerDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Container', function(Container) {
                            return Container.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('container', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('container.delete', {
            parent: 'container',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/container/container-delete-dialog.html',
                    controller: 'ContainerDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Container', function(Container) {
                            return Container.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('container', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
