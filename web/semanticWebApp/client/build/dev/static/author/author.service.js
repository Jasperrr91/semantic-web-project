(function () {
    'use strict';

    angular
        .module('app.paper')
        .factory('authorAPI', authorService);

    authorService.$inject = ['$http', '$q', 'ajaxErrorHandler'];
    /* @ngInject */
    function authorService ($http, $q, ajaxError) {
        var service = {
            getAuthors: getAuthors,
        };

        return service;

        /////////////

        function getAuthors () {
            var query = ['SELECT ?author (COUNT(DISTINCT ?document) AS ?cDocuments)',
                'WHERE {',
                    '?person a paper:Person ;',
            'rdfs:label ?author ;',
            'paper:isAuthorOf ?document .',
            '} GROUP BY ?author ORDER BY DESC(?cDocuments)'].join(' ');

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
