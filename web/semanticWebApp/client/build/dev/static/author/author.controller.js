(function () {
    'use strict';

    angular
        .module('app.author')
        .controller('AuthorController', AuthorController);

    AuthorController.$inject = ['authorAPI', 'LxNotificationService'];
    /* @ngInject */
    function AuthorController (authorAPI, LxNotificationService) {
        var vm = this;

        init();

        /////////////

        function init () {
            _getAuthorList();
        }

        function _getAuthorList () {
            authorAPI.getAuthors()
                .then(function (data) {
                    vm.authors = [];
                    data.forEach(function (author) {
                        var authorObject = {
                            'name': author.author.value,
                            'documentCount': author.cDocuments.value
                        };
                        //console.log(paperObject);
                        vm.authors.push(authorObject);
                    });
                });
        }
    }
})();
