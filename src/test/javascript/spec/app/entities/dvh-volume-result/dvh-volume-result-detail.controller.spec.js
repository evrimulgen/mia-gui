'use strict';

describe('Controller Tests', function() {

    describe('DvhVolumeResult Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockDvhVolumeResult;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockDvhVolumeResult = jasmine.createSpy('MockDvhVolumeResult');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'DvhVolumeResult': MockDvhVolumeResult
            };
            createController = function() {
                $injector.get('$controller')("DvhVolumeResultDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'miaApp:dvhVolumeResultUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
