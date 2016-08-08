'use strict';

describe('Controller Tests', function() {

    describe('DoseResult Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockDoseResult;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockDoseResult = jasmine.createSpy('MockDoseResult');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'DoseResult': MockDoseResult
            };
            createController = function() {
                $injector.get('$controller')("DoseResultDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'miaApp:doseResultUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
