/*
** angular-api version: 1.0.0 (https://github.com/Shinomix/angular-api)
** Simple REST API service easy to use and customize supporting custom headers and default request params
** 17-05-2015 - by : Maxence Haltel <maxence.haltel@gmail.com>
*/

(function() {

    angular.module('angular-api', [])
        .service('AngularApi', ApiService)
        .config(ConfigHttpHeader);


    ConfigHttpHeader.$inject = ['$httpProvider'];

    function ConfigHttpHeader($httpProvider) {
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $httpProvider.defaults.headers.post['Accept'] = 'application/json';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json, charset=utf-8';
        $httpProvider.defaults.headers.post['Access-Control-Max-Age'] = '1728000';

        $httpProvider.defaults.header.common['Accept'] = 'application/json, application/text';
        $httpProvider.defaults.header.common['Content-Type'] = 'application/json, charset=utf-8';
        $httpProvider.defaults.header.common['Access-Control-Max-Age'] = '1728000';

        $httpProvider.defaults.useXDomain = true;
    }


    Api.$inject = ['$http'];

    function ApiService($http) {
        var ApiServiceObject;

        var _settings = {
            url: 'localhost',
            defaultRequestParams : {}
        };

        var _authorizedMethod = ['get', 'put', 'post', 'delete'];
        var _requestPrototype = function(relativePath, method, data, isDefaultRequestParamsIncluded) {
            var _absolutePath = settings.url;
            var request = {
                url: '',
                method: ''
            };

            //execute request on baseUrl if relativePath is not of type string
            if (typeof relativePath !== 'string')
                relativePath = '';

            //if relativePath start by a '|' (by default invalid URL character)
            //consider relativePath is now absolutePath. otherwise append to baseUrl
            if (relativePath.substring(0,1) === '|')
                _absolutePath = relativePath.slice(1, path.length);
            else
                _absolutePath += relativePath;
            request.url = _absolutePath;

            if (authorizedMethod.indexOf(method) === -1)
                return null;
            request.method = method;

            //if data is json object or alike, encode it as json string
            if (typeof data === 'object' && data !== null) {
                //if there is any default params, append data with it
                if (settings.defaultRequestParams !== {} && isDefaultRequestParamsIncluded === true)
                    data = angular.extend({}, data, settings.defaultRequestParams);
                data = JSON.stringify(data);
            }
            //otherwise if data is another type but not string, convert it to string
            else if (typeof data !== 'string')
                data = data.toString();
            else
                data = data;


            //if method is get, send data as query string instead of json string
            if (method === 'get')
                request.params = data;
            else
                request.data = data;

            //return completed requst object
            return request;
        };

        function setApiUrl(newApiUrl) {
            if (!newApiUrl || typeof newApiUrl !== 'string')
                return null;
            settings.url = newApiUrl;
            return true;
        }

        function setDefaultRequestParams(newObject) {
            if (newObject === null || typeof newObject !== 'object')
                return null;

            settings.defaultRequestParams = newObject;
        }



        function POST(route, data, enableDefaultRequestParams) {
            if (typeof enableDefaultRequestParams === 'undefined')
                enableDefaultRequestParams = true;
            angular.extend(POST, {
                request: new _requestPrototype(route, 'post', data, enableDefaultRequestParams)
            });

            return $http(POST.request);
        }

        function GET(route, data, enableDefaultRequestParams) {
            if (typeof enableDefaultRequestParams === 'undefined')
                enableDefaultRequestParams = true;
            angular.extend(GET, {
                request: new _requestPrototype(route, 'get', data, enableDefaultRequestParams)
            });

            return $http(GET.request);
        }

        function PUT(route, data, enableDefaultRequestParams) {
            if (typeof enableDefaultRequestParams === 'undefined')
                enableDefaultRequestParams = true;
            angular.extend(PUT, {
                request: new _requestPrototype(route, 'put', data, enableDefaultRequestParams)
            });

            return $http(PUT.request);
        }

        function DELETE(route, data, enableDefaultRequestParams) {
            if (typeof enableDefaultRequestParams === 'undefined')
                enableDefaultRequestParams = true;
            angular.extend(DELETE, {
                request: new _requestPrototype(route, 'delete', data, enableDefaultRequestParams)
            });

            return $http(DELETE.request);
        }


        ApiServiceObject.setApiUrl = setApiUrl;
        ApiServiceObject.setDefaultRequestParams = setDefaultRequestParams;

        ApiServiceObject.post = POST;
        ApiServiceObject.get = GET;
        ApiServiceObject.put = PUT;
        ApiServiceObject.delete = DELETE;

        return ApiServiceObject;
    }
})();
