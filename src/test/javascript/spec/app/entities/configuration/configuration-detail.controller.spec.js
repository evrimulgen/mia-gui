'use strict';

describe('Controller Tests', function() {

    describe('Configuration Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockConfiguration, MockComputation;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockConfiguration = jasmine.createSpy('MockConfiguration');
            MockComputation = jasmine.createSpy('MockComputation');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Configuration': MockConfiguration,
                'Computation': MockComputation
            };
            createController = function() {
                $injector.get('$controller')("ConfigurationDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'miaApp:configurationUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
