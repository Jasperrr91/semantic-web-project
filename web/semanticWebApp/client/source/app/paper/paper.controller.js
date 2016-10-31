(function () {
    'use strict';

    angular
        .module('app.paper')
        .controller('PaperController', PaperController);

    PaperController.$inject = ['paperAPI', 'LxNotificationService'];
    /* @ngInject */
    function PaperController (paperAPI, LxNotificationService) {
        var vm = this;

        init();

        /////////////

        function init () {
            _getPaperList();
        }

        function _getPaperList () {
            paperAPI.getPapers()
                .then(function (data) {
                    vm.papers = [];
                    data.forEach(function (paper) {
                        var paperObject = {
                            'subject': paper.subject.value,
                            'authors': paper.authors.value
                        };
                        //console.log(paperObject);
                        vm.papers.push(paperObject);
                    });
                });
        }
    }
})();
