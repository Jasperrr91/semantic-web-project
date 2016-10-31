(function () {
    'use strict';

    angular
        .module('app.publisher')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.publisher',
                config: {
                    url: '/publisher',
                    views: {
                        'main@': {
                            templateUrl: 'static/publisher/publisher.html',
                            controller: 'PublisherController as vm'
                        }
                    },
                    data: {
                        title: 'Publisher Overview',
                        _class: 'publisher',
                    },
                    sidebar: {
                        icon: 'mdi-printer',
                        text: 'Publishers'
                    },
                    breadcrumb: 'Publisher List'
                }
            }
        ];
    }
})();
