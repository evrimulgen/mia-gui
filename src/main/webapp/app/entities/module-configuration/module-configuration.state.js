(function() {
    'use strict';

    angular
        .module('miaApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('module-configuration', {
            parent: 'entity',
            url: '/module-configuration?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.moduleConfiguration.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/module-configuration/module-configurations.html',
                    controller: 'ModuleConfigurationController',
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
                    $translatePartialLoader.addPart('moduleConfiguration');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('module-configuration-detail', {
            parent: 'entity',
            url: '/module-configuration/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.moduleConfiguration.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/module-configuration/module-configuration-detail.html',
                    controller: 'ModuleConfigurationDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('moduleConfiguration');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ModuleConfiguration', function($stateParams, ModuleConfiguration) {
                    return ModuleConfiguration.get({id : $stateParams.id});
                }]
            }
        })
        .state('module-configuration.new', {
            parent: 'module-configuration',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/module-configuration/module-configuration-dialog.html',
                    controller: 'ModuleConfigurationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                moduleName: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('module-configuration', null, { reload: true });
                }, function() {
                    $state.go('module-configuration');
                });
            }]
        })
        .state('module-configuration.edit', {
            parent: 'module-configuration',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/module-configuration/module-configuration-dialog.html',
                    controller: 'ModuleConfigurationDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ModuleConfiguration', function(ModuleConfiguration) {
                            return ModuleConfiguration.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('module-configuration', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('module-configuration.delete', {
            parent: 'module-configuration',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/module-configuration/module-configuration-delete-dialog.html',
                    controller: 'ModuleConfigurationDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ModuleConfiguration', function(ModuleConfiguration) {
                            return ModuleConfiguration.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('module-configuration', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
