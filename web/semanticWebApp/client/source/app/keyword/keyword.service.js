(function () {
    'use strict';

    angular
        .module('app.paper')
        .factory('keywordAPI', keywordService);

    keywordService.$inject = ['$http', '$q', 'ajaxErrorHandler'];
    /* @ngInject */
    function keywordService ($http, $q, ajaxError) {
        var service = {
            getKeywords: getKeywords
        };

        return service;

        /////////////

        function getKeywords () {
            var query = ['SELECT ?keyword (COUNT(DISTINCT ?document) AS ?cDocuments)',
                'WHERE {',
                    '?key a paper:Keyword ;',
            'rdfs:label ?keyword .',
                '?document paper:hasKeyword ?key .',
            '} GROUP BY ?keyword ORDER BY DESC(?cDocuments)'].join(' ');

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
