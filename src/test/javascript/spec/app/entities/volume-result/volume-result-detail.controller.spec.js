'use strict';

describe('Controller Tests', function() {

    describe('VolumeResult Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockVolumeResult;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockVolumeResult = jasmine.createSpy('MockVolumeResult');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'VolumeResult': MockVolumeResult
            };
            createController = function() {
                $injector.get('$controller')("VolumeResultDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'miaApp:volumeResultUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
