(function () {
    'use strict';

    app.service('SessionService', function () {

        const self = this;

        this.getCurrentUser = function(){
            return getUserFromCache();
        }

        this.setCurrentUser = function(user){
            return saveUserOnCache(user);
        }

        this.isUserLogged = function () {
            const userStr = localStorage.getItem('loggedUser');
            return userStr ? true : false;
        };

        this.logout = function() {
            removeUserFromCache();
        };

        function saveUserOnCache(user) {
            localStorage.setItem('loggedUser', JSON.stringify(user));
        }

        function getUserFromCache() {
            const userStr = localStorage.getItem('loggedUser');

            return userStr ? JSON.parse(userStr) : undefined;
        }

        function removeUserFromCache() {
            localStorage.removeItem('loggedUser');
        }

       

    });
})();