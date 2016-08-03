'use strict';

describe('Controller Tests', function() {

    describe('DvhDoseResult Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockDvhDoseResult;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockDvhDoseResult = jasmine.createSpy('MockDvhDoseResult');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'DvhDoseResult': MockDvhDoseResult
            };
            createController = function() {
                $injector.get('$controller')("DvhDoseResultDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'miaApp:dvhDoseResultUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
