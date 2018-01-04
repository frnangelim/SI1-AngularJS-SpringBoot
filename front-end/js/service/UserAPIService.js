app.factory("userAPI", function ($http,config) {

    var _addUser = function (user) {
        return $http.post(config.baseUrl + "/users", user);
    }

    var _login = function (user) {
        return $http.post(config.baseUrl + "/login", user);
    }

    var _getUser = function(id) {
        return $http.get(config.baseUrl + "/users/" + id);
    }

    return{
        addUser: _addUser,
        login: _login,
        getUser: _getUser
    }

});