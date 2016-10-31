(function () {
    'use strict';

    angular
        .module('app.keyword')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.keyword',
                config: {
                    url: '/keyword',
                    views: {
                        'main@': {
                            templateUrl: 'static/keyword/keyword.html',
                            controller: 'KeywordController as vm'
                        }
                    },
                    data: {
                        title: 'Keyword Overview',
                        _class: 'keyword',
                    },
                    sidebar: {
                        icon: 'mdi-alphabetical',
                        text: 'Keywords'
                    },
                    breadcrumb: 'Keyword List'
                }
            }
        ];
    }
})();
