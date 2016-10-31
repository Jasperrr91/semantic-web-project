(function () {
    'use strict';

    angular
        .module('app.publisher')
        .factory('publisherAPI', publisherService);

    publisherService.$inject = ['$http', '$q', 'ajaxErrorHandler'];
    /* @ngInject */
    function publisherService ($http, $q, ajaxError) {
        var service = {
            getPublishers: getPublishers
        };

        return service;

        /////////////

        function getPublishers () {
            var query = ['SELECT ?publisher (COUNT(DISTINCT ?document) AS ?cDocuments)',
                'WHERE {',
                '?publish a paper:Publisher ;',
                'rdfs:label ?publisher .',
                '?document paper:publishedBy ?publish .',
                '} GROUP BY ?publisher ORDER BY DESC(?cDocuments)'].join(' ');

            return $http({
                url: 'http://localhost:5820/app2/query',
                headers: {'Accept' : 'application/sparql-results+json'},
                method: 'GET',
                params: {
                    query: query,
                    format: 'json'
                }
            })
                .then(_success)
                .catch(ajaxError.catcher);

            function _success (response) {
                var data = response.data;
                console.log(data);
                return data.results.bindings;
            }

        }
    }
})();
