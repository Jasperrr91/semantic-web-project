(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['userAPI'];
    /* @ngInject */
    function DashboardController (userAPI) {
        var vm = this;

        vm.colors = [
            'bgc-indigo-500',
            'bgc-red-500',
            'bgc-pink-500'
        ];

        init();

        //////////////

        function init () {
            vm.userInfo = userAPI.getUserInfo();
            _getProductsSummary();
        }

        function _getProductsSummary () {
            console.log('products summary');
            userAPI.getCounts()
                .then(function (data) {
                    vm.products = [
                        {
                            'name': 'paper',
                            'count': data.cDocument.value,
                            'icon': 'mdi-file-document'
                        },
                        {
                            'name': 'author',
                            'count': data.cAuthor.value,
                            'icon': 'mdi-account-box'
                        },
                        {
                            'name': 'keyword',
                            'count': data.cKeyword.value,
                            'icon': 'mdi-alphabetical'
                        },
                        {
                            'name': 'publisher',
                            'count': data.cPublisher.value,
                            'icon': 'mdi-printer'
                        },
                    ];

                    vm.products.forEach(function (product) {
                        product.link = 'root.' + product.name;
                    });
                });
        }
    }
})();
