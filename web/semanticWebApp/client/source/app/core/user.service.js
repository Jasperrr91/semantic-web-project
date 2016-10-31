(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('userAPI', userSerivce);

    userSerivce.$inject = ['$http', '$q', '$rootScope', 'Event', 'ajaxErrorHandler'];
    /* @ngInject */
    function userSerivce ($http, $q, $rootScope, Event, ajaxError) {
        var _isLoggedIn;
        var _userInfo;
        var service = {
            isLoggedIn: isLoggedIn,
            checkLoggedInStatus: checkLoggedInStatus,
            login: login,
            logout: logout,
            getUserInfo: getUserInfo,
            getCounts: getCounts,
        };

        return service;

        /////////////

        function isLoggedIn () {
            return _isLoggedIn;
        }

        function checkLoggedInStatus () {
            return $http.get('api/user/loginstatus', {ignoreLoadingBar: true})
                .then(_success)
                .catch(_error);

            function _success (response) {
                var data = response.data;
                if (response.status === 200 && data.code === 0) {
                    _setUser(data.result.user);
                    $rootScope.$broadcast(Event.AUTH_SESSION_VALID, data.result.user);
                    return data.result.user;
                } else {
                    return $q.reject(data.message);
                }
            }

            function _error (reason) {
                _clearUser();
                return ajaxError.catcher(reason);
            }
        }

        function login (email, password) {
            var req = {
                email: email,
                password: password
            };
            return $http.post('api/user/login', req)
                .then(_success)
                .catch(_error);

            function _success (response) {
                var data = response.data;
                if (response.status === 200 && data.code === 0) {
                    _setUser(data.result.user);
                    $rootScope.$broadcast(Event.AUTH_LOGIN, data.result.user);
                    return data.result.user;
                } else {
                    return $q.reject(data.message);
                }
            }

            function _error (reason) {
                _clearUser();
                return ajaxError.catcher(reason);
            }

        }

        function logout () {
            return $http.post('api/user/logout')
                .then(_success)
                .catch(_error);

            function _success (response) {
                var data = response.data;
                _clearUser();
                if (response.status === 200 && data.code === 0) {
                    $rootScope.$broadcast(Event.AUTH_LOGOUT);
                } else {
                    return $q.reject(data.message);
                }
            }

            function _error (reason) {
                _clearUser();
                return ajaxError.catcher(reason);
            }
        }

        function getUserInfo () {
            return _userInfo;
        }

        function getCounts () {
            return $http({
                url: 'http://localhost:5820/app2/query',
                headers: {'Content-type' : 'application/x-www-form-urlencoded',
                    'Accept' : 'application/sparql-results+json'},
                method: 'GET',
                params: {
                    query: 'SELECT DISTINCT ?cDocument ?cAuthor ?cKeyword ?cPublisher' +
                    '{' +
                    '    {' +
                    '        SELECT DISTINCT (COUNT(DISTINCT ?document) AS ?cDocument)' +
                    '        {' +
                    '            ?document a paper:Document .' +
                    '        }' +
                    '    }' +
                    '' +
                    '    {' +
                    '        SELECT DISTINCT (COUNT(DISTINCT ?author) AS ?cAuthor)' +
                    '        {' +
                    '            $author a paper:Person .' +
                    '        }' +
                    '    }' +
                    '' +
                    '    {' +
                    '        SELECT DISTINCT (COUNT(DISTINCT ?keyword) AS ?cKeyword)' +
                    '        {' +
                    '            $keyword a paper:Keyword .' +
                    '        }' +
                    '    }' +
                    '' +
                    '    {' +
                    '        SELECT DISTINCT (COUNT(DISTINCT ?publisher) AS ?cPublisher)' +
                    '        {' +
                    '            $publisher a paper:Publisher .' +
                    '        }' +
                    '    }' +
                    '}',
                    format: 'json'
                }
            })
                .then(_success)
                .catch(ajaxError.catcher);

            function _success (response) {
                var data = response.data;
                return data.results.bindings[0];
            }

        }

        function _setUser (userData) {
            _isLoggedIn = true;
            _userInfo = userData;
        }

        function _clearUser () {
            _isLoggedIn = false;
            _userInfo = null;
        }

    }
})();
