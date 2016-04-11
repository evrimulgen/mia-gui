(function() {
    'use strict';
    angular
        .module('miaApp')
        .factory('Container', Container);

    Container.$inject = ['$resource'];

    function Container ($resource) {
        var resourceUrl =  'containerservice/' + 'api/containers/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    //data.containerStatusDate = DateUtils.convertLocalDateFromServer(data.containerStatusDate);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    //data.containerStatusDate = DateUtils.convertLocalDateToServer(data.containerStatusDate);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    //data.containerStatusDate = DateUtils.convertLocalDateToServer(data.containerStatusDate);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
