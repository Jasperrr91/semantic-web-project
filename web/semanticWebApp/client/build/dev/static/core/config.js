(function () {
    'use strict';

    angular
        .module('app.core')
        .config(appConfig);

    var config = {
        appErrorPrefix: '[Semantic Web App Error] ',
        appTitle: 'Semantic Web App'
    };

    appConfig.$inject = ['routerHelperProvider'];
    /* @ngInject */
    function appConfig (routerHelperProvider) {
        routerHelperProvider.configure({mainTitle: config.appTitle});
    }

})();
