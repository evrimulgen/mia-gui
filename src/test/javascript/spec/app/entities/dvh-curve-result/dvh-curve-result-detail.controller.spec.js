'use strict';

describe('Controller Tests', function() {

    describe('DvhCurveResult Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockDvhCurveResult;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockDvhCurveResult = jasmine.createSpy('MockDvhCurveResult');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'DvhCurveResult': MockDvhCurveResult
            };
            createController = function() {
                $injector.get('$controller')("DvhCurveResultDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'miaApp:dvhCurveResultUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
