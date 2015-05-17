#angular-api
> Simple REST API service easy to use and customize supporting custom headers and default request params


## Getting started
To start using the REST API service, simply copy it in your actual AngularJS project and include
`angular-api` in your main module.

### Configuration methods
angular-api expose two config methods over its service `AngularApi`:
```
AngularApi.setApiUrl(<string>newApiUrl)
AngularApi.setDefaultRequestParams(<object>newObject)
```
First is to set the base Url used in every call. Second is to set a default object included in each request data (configurable).


### REST methods
angular-api have a method by REST call, all with the same prototype:
```
AngularApi.post(<string>route, <object>data, [<bool>enableDefaultRequestParams])
AngularApi.get(<string>route, <object>data, [<bool>enableDefaultRequestParams])
AngularApi.put(<string>route, <object>data, [<bool>enableDefaultRequestParams])
AngularApi.delete(<string>route, <object>data, [<bool>enableDefaultRequestParams])
```
1. First parameter is the relative Url of the call, concatenated with the baseUrl. If `route` parameter starts by the char `|`, route will be considered as absolute.
2. Second parameter is the data sent in the request.
3. Last parameter is an optional boolean (by default at `true`) used to indicate if `defaultRequestParams` is included in the request data.

### Customizable headers
angular-api uses its own configuration of $http headers, set by default on AngularJS default settings. You can modify them changing the variables in the `ConfigHttpHeader` config function, located in the `angular-api.js` file.
