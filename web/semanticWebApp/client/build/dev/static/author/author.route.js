(function () {
    'use strict';

    angular
        .module('app.author')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.author',
                config: {
                    url: '/author',
                    views: {
                        'main@': {
                            templateUrl: 'static/author/author.html',
                            controller: 'AuthorController as vm'
                        }
                    },
                    data: {
                        title: 'Author Overview',
                        _class: 'author',
                    },
                    sidebar: {
                        icon: 'mdi-account-box',
                        text: 'Authors'
                    },
                    breadcrumb: 'Author List'
                }
            }
        ];
    }
})();
