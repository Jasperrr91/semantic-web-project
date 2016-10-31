(function () {
    'use strict';

    angular
        .module('app.publisher')
        .controller('PublisherController', PublisherController);

    PublisherController.$inject = ['publisherAPI', 'LxNotificationService'];
    /* @ngInject */
    function PublisherController (publisherAPI, LxNotificationService) {
        var vm = this;

        init();

        /////////////

        function init () {
            _getPublisherList();
        }

        function _getPublisherList () {
            publisherAPI.getPublishers()
                .then(function (data) {
                    vm.publishers = [];
                    data.forEach(function (publisher) {
                        var publisherObject = {
                            'name': publisher.publisher.value,
                            'documentCount': publisher.cDocuments.value
                        };
                        //console.log(paperObject);
                        vm.publishers.push(publisherObject);
                    });
                });
        }
    }
})();
