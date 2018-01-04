app.factory("albumsAPI", function ($http,config) {

    var _addAlbum = function (album) {
        return $http.post(config.baseUrl + "/albums", album);
    }

    var _getAlbums = function(){
        return $http.get(config.baseUrl + "/albums");
    }

    var _deleteAlbum = function(id){
        return $http.delete(config.baseUrl + /albums/ + id);
    }

    return{
        addAlbum: _addAlbum,
        getAlbums: _getAlbums,
        deleteAlbum: _deleteAlbum
    }

});