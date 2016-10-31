(function () {
    'use strict';

    angular
        .module('app.paper')
        .factory('paperAPI', paperService);

    paperService.$inject = ['$http', '$q', 'ajaxErrorHandler'];
    /* @ngInject */
    function paperService ($http, $q, ajaxError) {
        var service = {
            getPapers: getPapers
        };

        return service;

        /////////////

        function getPapers () {
            var query = ['SELECT ?subject (GROUP_CONCAT(?author; separator=";") AS ?authors) ',
            'WHERE {',
            '?document a paper:Document .',
            '?document paper:hasSubject ?subject .',
            '?authoruri a paper:Person ;',
            'paper:isAuthorOf ?document ;',
            'rdfs:label ?author .',
            '} GROUP BY ?subject'].join(' ');

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
