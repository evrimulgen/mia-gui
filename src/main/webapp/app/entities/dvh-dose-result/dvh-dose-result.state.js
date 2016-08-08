(function() {
    'use strict';

    angular
        .module('miaApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('dvh-dose-result', {
            parent: 'result',
            url: '/dvh-dose-result?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.dvhDoseResult.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dvh-dose-result/dvh-dose-results.html',
                    controller: 'DvhDoseResultController',
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
                    $translatePartialLoader.addPart('dvhDoseResult');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('dvh-dose-result-detail', {
            parent: 'entity',
            url: '/dvh-dose-result/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'miaApp.dvhDoseResult.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/dvh-dose-result/dvh-dose-result-detail.html',
                    controller: 'DvhDoseResultDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('dvhDoseResult');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'DvhDoseResult', function($stateParams, DvhDoseResult) {
                    return DvhDoseResult.get({id : $stateParams.id});
                }]
            }
        })
        .state('dvh-dose-result.new', {
            parent: 'dvh-dose-result',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dvh-dose-result/dvh-dose-result-dialog.html',
                    controller: 'DvhDoseResultDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                doseSopUid: null,
                                boundary: null,
                                volumeUnit: null,
                                doseUnit: null,
                                targetPrescriptionDose: null,
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
                    $state.go('dvh-dose-result', null, { reload: true });
                }, function() {
                    $state.go('dvh-dose-result');
                });
            }]
        })
        .state('dvh-dose-result.edit', {
            parent: 'dvh-dose-result',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dvh-dose-result/dvh-dose-result-dialog.html',
                    controller: 'DvhDoseResultDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['DvhDoseResult', function(DvhDoseResult) {
                            return DvhDoseResult.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('dvh-dose-result', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('dvh-dose-result.delete', {
            parent: 'dvh-dose-result',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/dvh-dose-result/dvh-dose-result-delete-dialog.html',
                    controller: 'DvhDoseResultDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['DvhDoseResult', function(DvhDoseResult) {
                            return DvhDoseResult.get({id : $stateParams.id});
                        }]
                    }
                }).result.then(function() {
                    $state.go('dvh-dose-result', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
