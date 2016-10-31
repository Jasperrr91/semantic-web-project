(function () {
    'use strict';

    angular
        .module('app.keyword')
        .controller('KeywordController', KeywordController);

    KeywordController.$inject = ['keywordAPI', 'LxNotificationService'];
    /* @ngInject */
    function KeywordController (keywordAPI, LxNotificationService) {
        var vm = this;

        init();

        /////////////

        function init () {
            _getKeywordList();
        }

        function _getKeywordList () {
            keywordAPI.getKeywords()
                .then(function (data) {
                    vm.keywords = [];
                    data.forEach(function (keyword) {
                        var keywordObject = {
                            'name': keyword.keyword.value,
                            'documentCount': keyword.cDocuments.value
                        };
                        //console.log(paperObject);
                        vm.keywords.push(keywordObject);
                    });
                });
        }
    }
})();
