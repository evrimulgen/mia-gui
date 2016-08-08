(function() {
    'use strict';

    angular
        .module('miaApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('containerconfiguration', {
            parent: 'miaconfiguration',
            url: '/containerconfiguration?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.configuration.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/configuration/configurations.html',
                    controller: 'ConfigurationController',
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
                    $translatePartialLoader.addPart('configuration');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('containerconfiguration-detail', {
            parent: 'containerconfiguration',
            url: '/containerconfiguration/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.configuration.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/configuration/configuration-detail.html',
                    controller: 'ConfigurationDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('configuration');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Configuration', function($stateParams, Configuration) {
                    return Configuration.get({id : $stateParams.id});
                }]
            }
        })
        .state('containerconfiguration.new', {
            parent: 'containerconfiguration',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/configuration/configuration-dialog.html',
                    controller: 'ConfigurationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                userId: null,
                                configurationIdentifier: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('containerconfiguration', null, { reload: true });
                }, function() {
                    $state.go('containerconfiguration');
                });
            }]
        })
        .state('containerconfiguration.edit', {
            parent: 'containerconfiguration',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/configuration/configuration-dialog.html',
                    controller: 'ConfigurationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Configuration', function(Configuration) {
                            return Configuration.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('containerconfiguration', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('containerconfiguration.delete', {
            parent: 'containerconfiguration',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/configuration/configuration-delete-dialog.html',
                    controller: 'ConfigurationDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Configuration', function(Configuration) {
                            return Configuration.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('containerconfiguration', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
