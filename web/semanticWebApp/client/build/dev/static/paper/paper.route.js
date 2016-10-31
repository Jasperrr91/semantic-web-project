(function () {
    'use strict';

    angular
        .module('app.paper')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    /* @ngInject */
    function appRun (routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates () {
        return [
            {
                state: 'root.paper',
                config: {
                    url: '/paper',
                    views: {
                        'main@': {
                            templateUrl: 'static/paper/paper.html',
                            controller: 'PaperController as vm'
                        }
                    },
                    data: {
                        title: 'Paper Overview',
                        _class: 'paper',
                    },
                    sidebar: {
                        icon: 'mdi-file-document',
                        text: 'Papers'
                    },
                    breadcrumb: 'Paper List'
                }
            },
            {
                state: 'root.paper.detail',
                config: {
                    url: '/:id',
                    views: {
                        'main@': {
                            templateUrl: 'static/paper/paper.detail.html',
                            controller: 'PaperDetailController as vm'
                        }
                    },
                    breadcrumb: 'Paper Detail'
                }
            }
        ];
    }
})();
