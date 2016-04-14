'use strict';

describe('Controller Tests', function() {

    describe('Computation Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockComputation, MockVolumeOfInterest;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockComputation = jasmine.createSpy('MockComputation');
            MockVolumeOfInterest = jasmine.createSpy('MockVolumeOfInterest');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Computation': MockComputation,
                'VolumeOfInterest': MockVolumeOfInterest
            };
            createController = function() {
                $injector.get('$controller')("ComputationDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'miaApp:computationUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
